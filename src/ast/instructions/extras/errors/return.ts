import { BudError } from "../../../types";

export class InvalidBlockIdentifier extends BudError {
    constructor() {
        super("InvalidBlockIdentifier", "Invalid identifier for block");
    }
}

export class TooManyChildren extends BudError {
    constructor() {
        super("TooManyChildren", "Too many children for a return statement");
    }
}