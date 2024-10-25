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

    scope(): Memory {
        return new Memory(this);
    }
}

export class Globals implements IMemory {
    private static memory: MemoryStorage = {
        "VAR_log": "VAR_DECLARATION_NATIVE_LOG",
        "VAR_ran": "VAR_DECLARATION_NATIVE_RAN",
        "VAR_number": "VAR_DECLARATION_NUMBER_TYPE",
        "VAR_string": "VAR_DECLARATION_STRING_TYPE",
        "VAR_boolean": "VAR_DECLARATION_BOOLEAN_TYPE",
        "VAR_true": "VAR_DECLARATION_TRUE",
        "VAR_false": "VAR_DECLARATION_FALSE",
    };

    set<K extends keyof MemoryStorage>(key: K, value: MemoryStorage[K], forceCurrent: boolean): void {
        throw new Error("Globals cannot be set");
    }

    get<K extends keyof MemoryStorage>(key: K, forceCurrent: boolean): MemoryStorage[K] {
        return Globals.memory[key];
    }

    scope(): IMemory {
        throw new Error("Globals cannot be scoped");
    }
}