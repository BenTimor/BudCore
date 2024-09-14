export class BudError extends Error {
    constructor(public name: string, message: string) {
        super(message);
    }
}

export class CompilerError extends BudError {
    constructor(message: string) {
        super("CompilerError", message);
    }
}