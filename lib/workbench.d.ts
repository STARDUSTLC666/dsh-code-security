import { type SecureToolDefinition } from './tools.js';
import { type ResolvedSecureConfig } from './config.js';
export declare const SECURITY_WORKBENCH_ROUTE = "/api/dsh-code-security/workbench";
export declare class SecurityWorkbench {
    readonly cfg: ResolvedSecureConfig;
    private readonly automaticProblems;
    private readonly jobs;
    private readonly tools;
    readonly directory: string;
    onAutoChanged?: (root: string, enabled: boolean) => void;
    constructor(cfg: ResolvedSecureConfig, options: {
        directory?: string;
        tools: (cfg: ResolvedSecureConfig, cwd: string) => SecureToolDefinition[];
    });
    private catalog;
    private update;
    remember(workspace: string, sessionId?: string): Promise<void>;
    configFor(root: string): Promise<ResolvedSecureConfig>;
    autoEnabled(root: string): Promise<boolean>;
    automaticProblem(root: string, reason?: string): void;
    private workspace;
    private report;
    runAutomatic(root: string, signal?: AbortSignal): Promise<any>;
    private safeResult;
    run(root: string, name: string, args: Record<string, unknown>, signal?: AbortSignal): Promise<any>;
    action(body: Record<string, unknown>): Promise<any>;
    fetch(request: Request): Promise<Response>;
    dispose(): Promise<void>;
}
export declare function installSecurityWorkbench(ctx: any, workbench: SecurityWorkbench): void;
