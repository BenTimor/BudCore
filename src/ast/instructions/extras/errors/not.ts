import { BudError } from "../../../types";

export class InvalidNotValue extends BudError {
    constructor() {
        super("InvalidNotValue", "Invalid value for not operator");
    }
}