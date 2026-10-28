/**
 * 读取原始 Git 改动前隔离属性转换；info/attributes 的优先级高于 --attr-source。
 */
import { createHash } from 'node:crypto';
import { lstatSync, readFileSync } from 'node:fs';
import { isAbsolute } from 'node:path';
function assertInfoAttributes(file) {
    let stat;
    try {
        stat = lstatSync(file);
    }
    catch (error) {
        if (error.code === 'ENOENT')
            return;
        throw error;
    }
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 64 * 1024)
        throw new Error('Git info/attributes 无法安全隔离，审查未完成 / Git info/attributes cannot be isolated; review incomplete');
    const content = readFileSync(file);
    // Git 的空白规则不同于 JS trim；NBSP 等不能被当作注释前的空白。
    if (content.length > 64 * 1024 || content.toString('utf8').split(/\r?\n/).some(line => !/^[ \t]*(?:#.*)?$/.test(line))) {
        throw new Error('Git info/attributes 含有属性规则，可能改变被审查内容；本次 diff 未运行，请先移除该规则或改用文件全量扫描 / Nonempty Git info/attributes; diff review incomplete');
    }
}
export async function prepareRawDiff(read) {
    const format = (await read(['rev-parse', '--show-object-format'])).trim();
    if (format !== 'sha1' && format !== 'sha256')
        throw new Error('无法确认 Git 对象格式，审查未完成 / Unknown Git object format; review incomplete');
    const file = (await read(['rev-parse', '--path-format=absolute', '--git-path', 'info/attributes'])).trim();
    if (!isAbsolute(file) || file.length > 4096 || /[\x00-\x1f]/.test(file))
        throw new Error('无法确认 Git 属性文件位置，审查未完成 / Invalid Git attribute path; review incomplete');
    assertInfoAttributes(file);
    return {
        option: '--attr-source=' + createHash(format).update('tree 0\u0000').digest('hex'),
        verify: () => assertInfoAttributes(file),
    };
}
