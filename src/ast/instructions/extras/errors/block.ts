import { BudError } from "../../../types";

export class MissingBlockEnd extends BudError {
    constructor() {
        super("MissingBlockEnd", "A block was opened but never closed. Expected a '}' at the end of the block");
    }
}

export class InvalidIdentifier extends BudError {
    constructor() {
        super("InvalidIdentifier", "Invalid identifier for block");
    }
}

export class MissingBlockAfterIdentifier extends BudError {
    constructor() {
        super("MissingBlock", "Expected a block after identifier");
    }
}