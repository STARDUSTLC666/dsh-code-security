export declare function prepareRawDiff(read: (args: string[]) => Promise<string>): Promise<{
    option: string;
    verify(): void;
}>;
