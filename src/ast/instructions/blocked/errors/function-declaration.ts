export class MissingParametersDeclaration extends Error {
    constructor() {
        super("Expected parentheses at the beginning of the function declaration");
    }
}

export class ExpectedVariableDeclaration extends Error {
    constructor() {
        super("Expected variable declaration in function parameters");
    }
}

export class ExpectedObjectParameter extends Error {
    constructor() {
        super("Expected object parameter when using object spread");
    }
}

export class ExpectedArrayParameter extends Error {
    constructor() {
        super("Expected array parameter when using array spread");
    }
}

export class ExpectedObjectAndArrayParameter extends Error {
    constructor() {
        super("Expected object and array parameter when using all spread");
    }
}

export class ExpectedBlockAfterFunctionDeclaration extends Error {
    constructor() {
        super("Expected block after function declaration");
    }
}