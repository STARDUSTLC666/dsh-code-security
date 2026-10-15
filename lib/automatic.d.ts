import type { SecurityWorkbench } from './workbench.js';
export declare class AutomaticSecurity {
    private readonly workbench;
    private readonly idleMs;
    private readonly pending;
    private readonly tasks;
    private readonly revisions;
    private readonly aliases;
    private readonly alerts;
    private closed;
    constructor(workbench: SecurityWorkbench, idleMs?: number);
    attach(host: any): () => void;
    observe(session: any, event: any): Promise<void>;
    context(agent: any): string;
    private cancel;
    whenIdle(): Promise<void>;
    dispose(): void;
}
