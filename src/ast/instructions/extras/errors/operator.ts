import { BudError } from "../../../types";

export class MissingLeftValue extends BudError {
    constructor() {
        super("MissingLeftValue", "Expected a left value before the operator");
    }
}

export class MissingRightValue extends BudError {
    constructor() {
        super("MissingRightValue", "Expected a right value after the operator");
    }
}

export class InvalidLeftValue extends BudError {
    constructor() {
        super("InvalidLeftValue", "Invalid left value before the operator");
    }
}

export class InvalidRightValue extends BudError {
    constructor() {
        super("InvalidRightValue", "Invalid right value after the operator");
    }
}

export class OperatorNotFound extends BudError {
    constructor(operator: string, leftType: string, rightType: string) {
        super("OperatorNotFound", `Operator ${operator} not found for types ${leftType} and ${rightType}`);
    }
}