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
        }],
        ["NativeNumberAdd", new class implements VariableProxy {
            get() {
                return (args: any) => args.left + args.right;
            }
            set() {
                throw new Error("Cannot set native variable");
            }
        }],
        ["NativeNumberSubtract", new class implements VariableProxy {
            get() {
                return (args: any) => args.left - args.right;
            }
            set() {
                throw new Error("Cannot set native variable");
            }
        }],
        ["NativeNumberMultiply", new class implements VariableProxy {
            get() {
                return (args: any) => args.left * args.right;
            }
            set() {
                throw new Error("Cannot set native variable");
            }
        }],
        ["NativeNumberDivide", new class implements VariableProxy {
            get() {
                return (args: any) => args.left / args.right;
            }
            set() {
                throw new Error("Cannot set native variable");
            }
        }],
        ["NativeNumberModulo", new class implements VariableProxy {
            get() {
                return (args: any) => args.left % args.right;
            }
            set() {
                throw new Error("Cannot set native variable");
            }
        }],
        ["NativeNumberPower", new class implements VariableProxy {
            get() {
                return (args: any) => args.left ** args.right;
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
        if (Variables.variables.has(key)) {
            return Variables.variables.get(key)?.set(value);
        }

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