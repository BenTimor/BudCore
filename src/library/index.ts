export interface VariableProxy {
    get(): any;
    set(value: any): any;
}

class Variables {
    private variables: Map<string, VariableProxy> = new Map([
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

    constructor(private parent?: Variables) {}

    get(key: string): any {
        return this.variables.get(key)?.get() ?? this.parent?.get(key);
    }

    set(key: string, value: any, forceCurrent: boolean): any {
        if (this.variables.has(key)) {
            return this.variables.get(key)?.set(value);
        }
        
        if (this.parent?.get(key) !== undefined && !forceCurrent) {
            return this.parent.set(key, value, false);
        }

        this.variables.set(key, new class implements VariableProxy { // TODO Add type safety and immutability
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

export class Bud {
    public variables: Variables;

    constructor(parent?: Bud) {
        this.variables = new Variables(parent?.variables);
    }

    scope(callback: (bud: Bud) => any[]) {
        return callback(new Bud(this));
    }
}

