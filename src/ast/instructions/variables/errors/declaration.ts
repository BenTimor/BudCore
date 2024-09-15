import { BudError } from "../../../types";

export class MissingVariableName extends BudError {
    constructor() {
        super("MissingVariableName", "Missing variable name");
    }
}

export class VariableAlreadyExists extends BudError {
    constructor() {
        super("VariableAlreadyExists", "Variable already exists");
    }
}