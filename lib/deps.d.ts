/**
 * SBOM-lite：解析常见依赖清单，输出依赖名称、版本约束与风险标记。
 * 只做确定性解析，不联网、不执行包管理器。
 *
 * @module dsh-code-security/deps
 */
export interface DependencyEntry {
    name: string;
    spec: string;
    manager: 'npm' | 'pypi' | 'go' | 'cargo' | 'composer' | 'ruby';
    file: string;
    kind: 'runtime' | 'dev' | 'peer' | 'optional' | 'unknown';
    risk: 'exact' | 'range' | 'unpinned' | 'git' | 'local' | 'wildcard';
    note: string;
}
export interface DepsScanResult {
    root: string;
    filesScanned: number;
    dependencies: DependencyEntry[];
    riskyCount: number;
    warnings: string[];
}
/** 扫描依赖清单，返回 SBOM-lite 结果。 */
export declare function scanDeps(root: string): Promise<DepsScanResult>;
