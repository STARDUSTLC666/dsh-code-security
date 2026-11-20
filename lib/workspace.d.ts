/** Resolve scan targets inside the calling workspace without following nested links. */
export declare function workspaceTarget(cwd: string, target?: string): Promise<string>;
