/** Offline manifest inventory. Parsing/coverage failures are explicit, never a clean audit. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { parse as parseToml } from 'smol-toml';
import { DEFAULT_EXCLUDE_DIRS } from './config.js';
import { redactText } from './privacy.js';
import { policyExcludesDir } from './policy.js';
const LOCKFILES = ['package-lock.json', 'npm-shrinkwrap.json', 'pnpm-lock.yaml', 'yarn.lock', 'bun.lock', 'uv.lock', 'poetry.lock', 'Pipfile.lock', 'pdm.lock', 'pylock.toml', 'Cargo.lock', 'composer.lock', 'Gemfile.lock', 'go.mod', 'requirements.txt', 'pom.xml'];
const MANIFESTS = ['package.json', 'requirements.txt', 'pyproject.toml', 'go.mod', 'Cargo.toml', 'composer.json', 'Gemfile'];
const record = (value) => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
function riskOfSpec(spec) {
    const s = spec.trim();
    if (!s)
        return { risk: 'unpinned', note: '未声明版本约束' };
    if (/^(?:file|link|workspace|path):/i.test(s))
        return { risk: 'local', note: '本地或工作区依赖' };
    if (/^(?:https?|git|github:)/i.test(s))
        return /#[a-f0-9]{7,40}$/i.test(s) ? { risk: 'exact', note: 'Git 提交已固定' } : { risk: 'git', note: '外部源未固定 Git 提交' };
    if (s === '*' || /^latest$/i.test(s) || /(?:^|\.)[x*](?:\.|$)/i.test(s))
        return { risk: 'wildcard', note: '浮动版本' };
    if (/^(?:==)?v?\d+(?:\.\d+)+(?:[-+][\w.-]+)?$/.test(s))
        return { risk: 'exact', note: '' };
    if (/[<>=~^]/.test(s) || s.includes('||'))
        return { risk: 'range', note: '' };
    return { risk: 'unpinned', note: '未能识别固定版本' };
}
export async function scanDeps(root, options = {}) {
    const dependencies = [], warnings = [];
    const lockfiles = [];
    let filesScanned = 0, filesSkipped = 0, visited = 0, complete = true;
    const warn = (text) => { complete = false; if (warnings.length < 100)
        warnings.push(text); };
    function add(name, rawSpec, manager, file, kind) {
        dependencies.push({ name: redactText(name), spec: redactText(rawSpec), manager, file, kind, ...riskOfSpec(rawSpec) });
    }
    function table(value, manager, file, kind) {
        if (value === undefined)
            return;
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            warn(file + ' 的依赖表格式无效');
            return;
        }
        for (const [name, valueSpec] of Object.entries(record(value))) {
            if (typeof valueSpec !== 'string' && (!valueSpec || typeof valueSpec !== 'object' || Array.isArray(valueSpec))) {
                warn(file + ' 含无效依赖声明');
                continue;
            }
            const obj = record(valueSpec);
            const spec = typeof valueSpec === 'string' ? valueSpec : typeof obj.git === 'string' ? obj.git + (typeof obj.rev === 'string' ? '#' + obj.rev : '') : typeof obj.path === 'string' ? 'path:' + obj.path : typeof obj.version === 'string' ? obj.version : '';
            add(name, spec, manager, file, kind);
        }
    }
    function requirement(value, file, kind) {
        if (typeof value !== 'string') {
            warn(file + ' 含尚未展开的依赖组引用');
            return;
        }
        const match = /^\s*([A-Za-z0-9_.-]+)(?:\[[^\]]+\])?\s*(.*)$/.exec(value);
        if (!match) {
            warn(file + ' 有未识别的 Python 依赖');
            return;
        }
        add(match[1], match[2].split(';', 1)[0].trim().replace(/^@\s*/, ''), 'pypi', file, kind);
    }
    function pyproject(text, file) {
        const doc = parseToml(text), project = record(doc.project);
        if (project.dependencies !== undefined && !Array.isArray(project.dependencies))
            throw new Error('invalid dependencies');
        for (const item of project.dependencies ?? [])
            requirement(item, file, 'runtime');
        for (const items of Object.values(record(project['optional-dependencies']))) {
            if (!Array.isArray(items)) {
                warn(file + ' 可选依赖不是数组');
                continue;
            }
            items.forEach(item => requirement(item, file, 'optional'));
        }
        for (const items of Object.values(record(doc['dependency-groups']))) {
            if (!Array.isArray(items)) {
                warn(file + ' 依赖组不是数组');
                continue;
            }
            items.forEach(item => requirement(item, file, 'dev'));
        }
        const poetry = record(record(doc.tool).poetry);
        const poetryTable = (value, kind) => table(Object.fromEntries(Object.entries(record(value)).filter(([name]) => name !== 'python')), 'pypi', file, kind);
        poetryTable(poetry.dependencies, 'runtime');
        poetryTable(poetry['dev-dependencies'], 'dev');
        for (const group of Object.values(record(poetry.group)))
            poetryTable(record(group).dependencies, 'dev');
        if (Array.isArray(project.dynamic) && project.dynamic.includes('dependencies'))
            warn(file + ' 的 dependencies 为动态声明，未执行项目代码读取');
    }
    function parse(text, base, file) {
        if (base === 'package.json' || base === 'composer.json') {
            const pkg = JSON.parse(text);
            if (!pkg || typeof pkg !== 'object' || Array.isArray(pkg))
                throw new Error('invalid manifest');
            if (base === 'package.json')
                for (const [field, kind] of [['dependencies', 'runtime'], ['devDependencies', 'dev'], ['peerDependencies', 'peer'], ['optionalDependencies', 'optional']])
                    table(pkg[field], 'npm', file, kind);
            else {
                table(pkg.require, 'composer', file, 'runtime');
                table(pkg['require-dev'], 'composer', file, 'dev');
            }
        }
        else if (base === 'pyproject.toml')
            pyproject(text, file);
        else if (base === 'requirements.txt')
            for (const line of text.split(/\r?\n/)) {
                const item = line.trim();
                if (!item || item.startsWith('#'))
                    continue;
                if (item.startsWith('-')) {
                    warn(file + ' 包含外部文件/安装选项，未执行解析');
                    continue;
                }
                requirement(item.split(/\s+#/, 1)[0], file, 'runtime');
            }
        else if (base === 'Cargo.toml') {
            const doc = parseToml(text);
            const cargo = (value) => { const obj = record(value); for (const [field, kind] of [['dependencies', 'runtime'], ['dev-dependencies', 'dev'], ['build-dependencies', 'dev']])
                table(obj[field], 'cargo', file, kind); };
            cargo(doc);
            cargo(record(doc.workspace));
            Object.values(record(doc.target)).forEach(cargo);
        }
        else if (base === 'go.mod') {
            for (const m of text.matchAll(/^\s*(?:require\s+)?([A-Za-z0-9_.\/-]+)\s+(v[0-9][^\s]*)/gm))
                add(m[1], m[2], 'go', file, 'runtime');
            if (/^\s*replace\s/m.test(text))
                warn(file + ' 含 replace，清单不代表最终解析图');
        }
        else
            for (const m of text.matchAll(/^\s*gem\s+['"]([^'"]+)['"]\s*(?:,\s*['"]([^'"]*)['"]\s*)?/gm))
                add(m[1], m[2] ?? '', 'ruby', file, 'runtime');
    }
    async function visit(absolute, rel) {
        options.signal?.throwIfAborted();
        if (++visited > 100000 || filesScanned >= (options.maxFiles ?? 5000)) {
            warn('已达到扫描数量上限');
            return;
        }
        if (rel.split('/').some(p => DEFAULT_EXCLUDE_DIRS.includes(p)) || options.policy && policyExcludesDir(options.policy, rel)) {
            filesSkipped++;
            return;
        }
        let stat;
        try {
            stat = await fs.lstat(absolute);
        }
        catch {
            filesSkipped++;
            warn('无法读取 ' + rel);
            return;
        }
        if (stat.isSymbolicLink()) {
            filesSkipped++;
            if (absolute === path.resolve(root))
                warn('目标为链接，未读取链接内容');
            return;
        }
        if (stat.isDirectory()) {
            let entries;
            try {
                entries = await fs.readdir(absolute, { withFileTypes: true });
            }
            catch {
                warn('无法遍历 ' + rel);
                return;
            }
            for (const entry of entries) {
                if (visited > 100000 || filesScanned >= (options.maxFiles ?? 5000)) {
                    warn('已达到扫描数量上限');
                    break;
                }
                ;
                await visit(path.join(absolute, entry.name), rel ? rel + '/' + entry.name : entry.name);
            }
            return;
        }
        if (!stat.isFile() || !MANIFESTS.includes(path.basename(absolute)) && !LOCKFILES.includes(path.basename(absolute)))
            return;
        if (stat.size > (options.maxFileBytes ?? 2 * 1024 * 1024)) {
            filesSkipped++;
            warn(rel + ' 超过文件大小上限');
            return;
        }
        filesScanned++;
        try {
            const text = await fs.readFile(absolute, { encoding: 'utf8', signal: options.signal }), file = rel || path.basename(absolute);
            if (LOCKFILES.includes(path.basename(absolute))) {
                lockfiles.push(file);
                options.onDocument?.({ file, text });
            }
            if (MANIFESTS.includes(path.basename(absolute)))
                parse(text, path.basename(absolute), file);
        }
        catch {
            options.signal?.throwIfAborted();
            warn('无法解析 ' + (rel || path.basename(absolute)) + '：清单格式无效，本文件不计作已确认安全');
        }
    }
    await visit(path.resolve(root), '');
    return { root, filesScanned, filesSkipped, dependencies, riskyCount: dependencies.filter(item => !['exact', 'range'].includes(item.risk)).length, warnings, complete, lockfiles };
}
