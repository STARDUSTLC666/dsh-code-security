import path from 'node:path'
// 合成 runner 的元数据响应；安全边界另用真实 Git 仓库验证。
export function gitOutput(argv, cwd, otherwise = '') {
  if (argv.includes('--show-object-format')) return 'sha1\n'
  if (argv.includes('--git-path')) return path.resolve(cwd, '.git/info/attributes') + '\n'
  return otherwise
}
