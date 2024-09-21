import { BudError } from "../../../types";

export class StringNotClosed extends BudError {
    constructor() {
        super("STRING_NOT_CLOSED", "String not closed");
    }
}

export class InvalidEscapeCharacter extends BudError {
    constructor(char: string) {
        super("INVALID_ESCAPE_CHARACTER", `Invalid escape character \\${char}`);
    }
}