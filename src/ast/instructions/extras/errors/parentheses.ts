import { BudError } from "../../../types";

export class EmptyParenteses extends BudError {
    constructor() {
        super("EmptyParentheses", "Empty parentheses are not allowed");
    }
}