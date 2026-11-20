/** Resolve scan targets inside the calling workspace without following nested links. */
export declare function workspaceTarget(cwd: string, target?: string): Promise<string>;
/** Read at most the configured file budget, including when the file grows mid-read. */
export declare function boundedFile(file: string, limit: number, signal?: AbortSignal): Promise<Buffer>;
