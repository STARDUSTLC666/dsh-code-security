import fs from 'node:fs/promises'
import { constants, type Stats } from 'node:fs'
import path from 'node:path'

function outside(root: string, file: string): boolean {
  const relative = path.relative(root, file)
  return relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)
}

/** Resolve scan targets inside the calling workspace without following nested links. */
export async function workspaceTarget(cwd: string, target = '.'): Promise<string> {
  const root = path.resolve(cwd), absolute = path.resolve(root, target)
  if (outside(root, absolute)) throw new Error('扫描目标必须位于当前会话工作区内 / Scan target must remain inside the session workspace')
  const canonicalRoot = await fs.realpath(root)
  let current = root
  for (const part of path.relative(root, absolute).split(path.sep).filter(Boolean)) {
    current = path.join(current, part)
    let info
    try { info = await fs.lstat(current) }
    catch (error) {
      // Keep the scanner's existing incomplete result for a missing target.
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') break
      throw error
    }
    if (info.isSymbolicLink()) throw new Error('扫描目标不能经过符号链接或目录联接 / Scan target cannot traverse a symlink or junction')
    if (outside(canonicalRoot, await fs.realpath(current))) throw new Error('扫描目标已移出当前工作区 / Scan target is outside the session workspace')
  }
  return absolute
}

function sameFile(left: Stats, right: Stats): boolean { return left.dev === right.dev && left.ino === right.ino }

/** Read at most the configured file budget, including when the file grows mid-read. */
export async function boundedFile(file: string, limit: number, signal?: AbortSignal, expected?: Stats, workspaceRoot?: string): Promise<Buffer> {
  signal?.throwIfAborted()
  const oversized = () => Object.assign(new Error('文件超过大小上限 / File exceeds the size limit'), {code:'SCAN_FILE_TOO_LARGE'})
  const changed = () => Object.assign(new Error('扫描期间文件已变化 / File changed during scan'), {code:'SCAN_FILE_CHANGED'})
  const outsideWorkspace = () => Object.assign(new Error('文件已移出当前工作区 / File is outside the workspace'), {code:'SCAN_FILE_OUTSIDE_WORKSPACE'})
  const canonical = await fs.realpath(file)
  if (workspaceRoot && outside(workspaceRoot, canonical)) throw outsideWorkspace()
  const pathInfo = await fs.stat(canonical)
  if (!pathInfo.isFile() || expected && !sameFile(expected, pathInfo)) throw changed()
  const flags = constants.O_RDONLY | (process.platform === 'win32' ? 0 : constants.O_NOFOLLOW ?? 0)
  const handle = await fs.open(canonical, flags)
  try {
    signal?.throwIfAborted()
    const info = await handle.stat()
    if (!info.isFile()) throw new Error('扫描目标不是普通文件 / Scan target is not a regular file')
    const currentPath = await fs.realpath(file)
    if (workspaceRoot && outside(workspaceRoot, currentPath)) throw outsideWorkspace()
    const currentInfo = await fs.stat(currentPath)
    if (!sameFile(info, pathInfo) || !sameFile(info, currentInfo) || expected && !sameFile(info, expected)) throw changed()
    if (info.size > limit) throw oversized()
    const chunks: Buffer[] = []; let size = 0
    for (;;) {
      signal?.throwIfAborted()
      const bytes = Buffer.allocUnsafe(Math.min(65536, limit + 1 - size))
      const result = await handle.read(bytes, 0, bytes.length, null)
      signal?.throwIfAborted()
      if (!result.bytesRead) return Buffer.concat(chunks, size)
      size += result.bytesRead
      if (size > limit) throw oversized()
      chunks.push(bytes.subarray(0, result.bytesRead))
    }
  } finally { await handle.close() }
}
