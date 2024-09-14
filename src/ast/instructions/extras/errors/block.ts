import { BudError } from "../../../types";

export class MissingBlockEnd extends BudError {
    constructor() {
        super("MissingBlockEnd", "A block was opened but never closed. Expected a '}' at the end of the block");
    }
}