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
