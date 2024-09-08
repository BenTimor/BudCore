export class Memory {
    private static memory: Map<string, any> = new Map([
        ["NativeLog", ({ values }: { values: any[] }) => {
            console.log(...values);
        }]
    ]);

    static get(key: string) {
        return Memory.memory.get(key);
    }

    static set(key: string, value: any) {
        Memory.memory.set(key, value);
        return value;
    }
}