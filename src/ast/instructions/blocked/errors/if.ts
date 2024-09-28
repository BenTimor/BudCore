import { BudError } from "../../../types";

export class ConditionMustBeBoolean extends BudError {
    constructor() {
        super("ConditionMustBeBoolean", "If condition must be a boolean");
    }
}

export class ExpectedBlockAfterIf extends BudError {
    constructor() {
        super("ExpectedBlockAfterIf", "Expected a block after the if condition");
    }
}

export class MismatchIfElseType extends BudError {
    constructor() {
        super("MismatchIfElseType", "If and else block types must match");
    }
}