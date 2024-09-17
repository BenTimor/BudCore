export type MemoryStorage = {
    [key: `VAR_${string}`]: `VAR_DECLARATION_${string}`,
};

export interface IMemory {
    set<K extends keyof MemoryStorage>(key: K, value: MemoryStorage[K], forceCurrent: boolean): void;
    get<K extends keyof MemoryStorage>(key: K, forceCurrent: boolean): MemoryStorage[K];
    scope(): IMemory;
}