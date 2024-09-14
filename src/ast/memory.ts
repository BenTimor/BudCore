import { IMemory, MemoryStorage } from "./types";

export class Memory implements IMemory {
    constructor(private parent?: IMemory) {}

    private memory: MemoryStorage = {
    };

    set<K extends keyof MemoryStorage>(key: K, value: MemoryStorage[K], forceCurrent: boolean) {
        if (!this.parent || forceCurrent) {
            this.memory[key] = value;
            return;
        }

        const currentValue = this.memory[key];

        if (currentValue === undefined) {
            const parentValue = this.parent.get(key, false);

            if (parentValue !== undefined) {
                this.parent.set(key, parentValue, false);
                return;
            }
        }

        this.memory[key] = value;
    }

    get<K extends keyof MemoryStorage>(key: K, forceCurrent: boolean): MemoryStorage[K] {
        if (forceCurrent) {
            return this.memory[key];
        }

        return this.memory[key] ?? this.parent?.get(key, false);
    }
}

export class Globals implements IMemory {
    private static memory: MemoryStorage = {
        "VAR_log": "VAR_DECLARATION_NATIVE_LOG",
    };

    set<K extends keyof MemoryStorage>(key: K, value: MemoryStorage[K], forceCurrent: boolean): void {
        throw new Error("Globals cannot be set");
    }

    get<K extends keyof MemoryStorage>(key: K, forceCurrent: boolean): MemoryStorage[K] {
        return Globals.memory[key];
    }
}