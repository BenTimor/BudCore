import { BudError } from "../../../types";

export class InvalidBlockIdentifier extends BudError {
    constructor() {
        super("InvalidBlockIdentifier", "Invalid identifier for block");
    }
}