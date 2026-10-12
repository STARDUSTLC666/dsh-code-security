import test from 'node:test'
import assert from 'node:assert/strict'
import { parseDiff, scanDiff } from '../lib/diff.js'

const DIFF = `diff --git a/src/a.js b/src/a.js
--- a/src/a.js
+++ b/src/a.js
@@ -3,0 +4,2 @@
+eval(userInput)
+console.log(password)
@@ -10 +12 @@
-const x = 1
+const pwd = "secret123"
`

test('parseDiff 映射新增行号', () => {
  const files = parseDiff(DIFF, 'C:/repo')
  assert.equal(files.length, 1)
  assert.equal(files[0].file, 'src/a.js')
  assert.deepEqual(files[0].added.map(x => x.line), [4, 5, 12])
})

test('scanDiff 只报告新增行', () => {
  const result = scanDiff(DIFF, 'C:/repo', { version: 1, exclude: [], ignore: [] })
  assert.equal(result.filesChanged, 1)
  assert.equal(result.addedLines, 3)
  assert.ok(result.findings.some(f => f.ruleId === 'SEC-001'))
  assert.ok(result.findings.some(f => f.ruleId === 'SEC-301'))
  assert.equal(result.findings.some(f => f.file === 'src/a.js' && f.line === 12), true)
})

test('scanDiff checks added private keys, .env secrets and disabled audit at their actual lines', () => {
  const diff = [
    'diff --git a/.env b/.env', '--- a/.env', '+++ b/.env',
    '@@ -6,0 +7 @@', '+API_TOKEN=fixture-value',
    'diff --git a/key.pem b/key.pem', '--- a/key.pem', '+++ b/key.pem',
    '@@ -10,0 +11 @@', '+-----BEGIN PRIVATE KEY-----',
    'diff --git a/.npmrc b/.npmrc', '--- a/.npmrc', '+++ b/.npmrc',
    '@@ -2 +2 @@', '-audit=true', '+audit=false',
  ].join('\n')
  const result = scanDiff(diff, 'C:/repo', { version: 1, exclude: [], ignore: [] })
  assert.deepEqual(result.findings.map(f => [f.ruleId, f.file, f.line]), [
    ['SEC-303', 'key.pem', 11], ['SEC-305', '.env', 7], ['SEC-404', '.npmrc', 2],
  ])
})

test('parseDiff decodes Git octal UTF-8 and quoted filename escapes', () => {
  const encoded = [...Buffer.from('中文')].map(byte => '\\' + byte.toString(8).padStart(3, '0')).join('')
  const header = '"b/src/' + encoded + '\\tquoted\\".js"'
  const files = parseDiff(['diff --git a/x b/x', '--- a/x', '+++ ' + header, '@@ -0,0 +1 @@', '+eval(input)'].join('\n'), 'C:/repo')
  assert.equal(files[0]?.file, 'src/中文\tquoted".js')
  assert.deepEqual(files[0]?.added, [{ line: 1, text: 'eval(input)' }])
})

test('parseDiff treats header-like added content as code and keeps new line numbers', () => {
  const diff = [
    'diff --git a/a.js b/a.js', '--- a/a.js', '+++ b/a.js',
    '@@ -0,0 +1,3 @@', '+++ b/pretend.js', '+++eval(input)', '+eval(other)',
    '\\ No newline at end of file',
    'diff --git a/deleted.js b/deleted.js', 'deleted file mode 100644',
    '--- a/deleted.js', '+++ /dev/null', '@@ -1 +0,0 @@', '-eval(old)',
  ].join('\n')
  const files = parseDiff(diff, 'C:/repo')
  assert.deepEqual(files, [{
    file: 'a.js',
    added: [{ line: 1, text: '++ b/pretend.js' }, { line: 2, text: '++eval(input)' }, { line: 3, text: 'eval(other)' }],
  }])
  assert.deepEqual(scanDiff(diff, 'C:/repo', { version: 1, exclude: [], ignore: [] }).findings.map(f => [f.file, f.line]), [['a.js', 2], ['a.js', 3]])
})

test('scanDiff applies policy and default directory exclusions before reviewing added lines', () => {
  const paths = ['node_modules/vendor.js', 'dist/bundle.js', 'vendor/a.js', 'src/generated.js', 'src/keep.js']
  const diff = paths.flatMap(file => ['diff --git a/' + file + ' b/' + file, '--- a/' + file, '+++ b/' + file, '@@ -0,0 +1 @@', '+eval(input)']).join('\n')
  const result = scanDiff(diff, 'C:/repo', { version: 1, exclude: ['vendor/**', 'src/generated.js'], ignore: [] })
  assert.deepEqual(result.findings.map(f => f.file), ['src/keep.js'])
  assert.equal(result.filesChanged, 5)
  assert.equal(result.filesScanned, 1)
  assert.equal(result.filesSkipped, 4)
  assert.equal(result.addedLines, 1)
})

test('parseDiff rejects a truncated hunk instead of returning a partial clean result', () => {
  assert.throws(() => parseDiff([
    'diff --git a/a.js b/a.js', '--- a/a.js', '+++ b/a.js',
    '@@ -0,0 +1,2 @@', '+const safe = 1',
  ].join('\n'), 'C:/repo'), /diff.*不完整|diff.*格式无效/)
})

test('diff context honors existing next-line suppressions without reporting old findings', () => {
  const diff = [
    'diff --git a/a.js b/a.js', '--- a/a.js', '+++ b/a.js',
    '@@ -1,3 +1,4 @@', ' eval(old)', ' // secure-review-disable-next-line SEC-001',
    '-const safe = 1', '+eval(suppressed)', '+eval(fresh)',
  ].join('\n')
  const result = scanDiff(diff, 'C:/repo', { version: 1, exclude: [], ignore: [] })
  assert.deepEqual(result.findings.map(f => [f.ruleId, f.line]), [['SEC-001', 4]])
})

test('file rules match multiline added evidence and changed values with unchanged keys', () => {
  const policy = { version: 1, exclude: [], ignore: [] }
  const diff = [
    'diff --git a/package.json b/package.json', '--- a/package.json', '+++ b/package.json',
    '@@ -1,4 +1,4 @@', ' {', '   "audit":', '-    true', '+    false', ' }',
  ].join('\n')
  const result = scanDiff(diff, 'C:/repo', policy)
  assert.deepEqual(result.findings.map(f => [f.ruleId, f.line, f.snippet]), [['SEC-404', 2, '"audit":\n    false']])
  const separated = [
    'diff --git a/package.json b/package.json', '--- a/package.json', '+++ b/package.json',
    '@@ -0,0 +1 @@', '+"audit":', '@@ -19,0 +21 @@', '+false',
  ].join('\n')
  assert.deepEqual(scanDiff(separated, 'C:/repo', policy).findings, [])
})
