import { BudError } from "../../../types";

export class VariableNotFound extends BudError {
    constructor(name: string) {
        super("VariableNotFound", `Variable ${name} not found`);
    }
}

export class VariableIsImmutable extends BudError {
    constructor(name: string) {
        super("VariableIsImmutable", `Variable ${name} is immutable`);
    }
}