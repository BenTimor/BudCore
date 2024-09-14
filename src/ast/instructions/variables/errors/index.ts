import { BudError } from "../../../types";

export class MultipleValuesInVariable extends BudError {
    constructor() {
        super("MultipleValuesInVariable", "Multiple values in variable declaration");
    }
}

export class MissingVariableValue extends BudError {
    constructor() {
        super("MissingVariableValue", "Missing variable value");
    }
}

export class MissingEqualsSign extends BudError {
    constructor() {
        super("MissingEqualsSign", "Expected equals sign");
    }
}

export * from "./declaration";