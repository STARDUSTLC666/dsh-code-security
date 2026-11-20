import fs from 'node:fs/promises'
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
