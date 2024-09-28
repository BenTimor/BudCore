import { BudError } from "../../../types";

export class TooManyChildren extends BudError {
    constructor() {
        super("TooManyChildren", "Too many children for a return statement");
    }
}