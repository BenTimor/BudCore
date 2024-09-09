export interface VariableProxy {
    get(): any;
    set(value: any): any;
}

export class Variables {
    private static variables: Map<string, VariableProxy> = new Map([
        ["NativeLog", new class implements VariableProxy {
            get() {
                return (args: any) => console.log(...args.values);
            }
            set() {
                throw new Error("Cannot set native variable");
            }
        }]
    ]);

    static get(key: string) {
        return Variables.variables.get(key)?.get();
    }

    static set(key: string, value: any) {
        Variables.variables.set(key, new class implements VariableProxy { // TODO Add type safety and immutability
            private value = value;

            get() {
                return this.value;
            }
            set(newValue: any) {
                this.value = newValue;
                return value;
            }
        });
        return value;
    }
}