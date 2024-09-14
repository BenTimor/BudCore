export class InvalidFunctionParameter extends Error {
    constructor() {
        super("Invalid function parameter. Function parameters must be variable declarations");
    }
}

export class MissingFunctionParameterValue extends Error {
    constructor() {
        super("Missing function parameter value");
    }
}