export interface VariableProxy {
    get(): any;
    set(value: any): any;
}

class Variables {
    private variables: Map<string, VariableProxy> = new Map([
        // TODO Move these to a separate file
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
        }],
        ["NativeNumberGreaterThan", new class implements VariableProxy {
            get() {
                return (args: any) => args.left > args.right;
            }
            set() {
                throw new Error("Cannot set native variable");
            }
        }],
        ["NativeNumberLessThan", new class implements VariableProxy {
            get() {
                return (args: any) => args.left < args.right;
            }
            set() {
                throw new Error("Cannot set native variable");
            }
        }],
        ["NativeNumberGreaterThanOrEqual", new class implements VariableProxy {
            get() {
                return (args: any) => args.left >= args.right;
            }
            set() {
                throw new Error("Cannot set native variable");
            }
        }],
        ["NativeNumberLessThanOrEqual", new class implements VariableProxy {
            get() {
                return (args: any) => args.left <= args.right;
            }
            set() {
                throw new Error("Cannot set native variable");
            }
        }],
        ["NativeEqual", new class implements VariableProxy {
            get() {
                return (args: any) => args.left === args.right; // TODO Change it to internal mechanism that validates more things like types
            }
            set() {
                throw new Error("Cannot set native variable");
            }
        }
        ]
    ]);

    constructor(bud: Bud, private parent?: Variables) {
        this.variables.set("NativeBlockRan", new class implements VariableProxy {
            get() {
                return (args: any) => bud.ran(args.id);
            }
            set() {
                throw new Error("Cannot set native variable");
            }
        })
    }

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

function newBudArray(arr: any[]) {
    return new Proxy(arr, {
        get(target, prop: any) {
            if (prop === "size") {
                return target.length;
            }

            return target[prop];
        }
    });
}

export class Bud {
    public variables: Variables;
    public returnValue: any = undefined;
    public returnScope: string | undefined = undefined;
    public continueScope: string | undefined = undefined;

    constructor(parent?: Bud, private scopes: Set<string> = new Set(), public exports: Record<string, any> = {}) {
        this.variables = new Variables(this, parent?.variables);
    }

    parentheses(callback: (bud: Bud) => Function[]) {
        const funcs = callback(new Bud(this, this.scopes, this.exports));

        const resp = funcs.map((f) => f());

        if (resp.length === 1) {
            return resp[0];
        }

        return resp;
    }

    return(id: string, value: any) {
        this.returnValue = value;
        this.returnScope = id;
    }

    continue(id: string) {
        this.continueScope = id;
    }

    ran(id: string) {
        return this.scopes.has(id);
    }

    block(id: string, callback: (bud: Bud) => Function[]) {
        this.scopes = new Set(this.scopes).add(id);
        let executeBlock = true;

        while (executeBlock) {
            executeBlock = false;

            const bud = new Bud(this, this.scopes, this.exports);
            const funcs = callback(bud);

            for (const func of funcs) {
                func();

                if (bud.returnScope !== undefined) {
                    if (bud.returnScope === id) {
                        return bud.returnValue;
                    }
                    else {
                        this.returnValue = bud.returnValue;
                        this.returnScope = bud.returnScope;
                        return undefined;
                    }
                }

                if (bud.continueScope !== undefined) {
                    if (bud.continueScope === id) {
                        executeBlock = true;
                        break;
                    }
                    else {
                        this.continueScope = bud.continueScope;
                        return undefined;
                    }
                }
            }
        }

        return undefined;
    }

    if(condition: boolean, ifDo: Function, elseDo: Function) {
        if (condition) {
            return ifDo();
        }
        else {
            return elseDo();
        }
    }

    export(name: string, value: any) {
        this.exports[name] = value;
    }

    array(array: any[]) {
        return newBudArray(array);
    }
}

