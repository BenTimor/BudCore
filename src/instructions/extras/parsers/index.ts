import { EqualsParser } from "./equals";
import { OperatorParser } from "./operator";
import { SemicolonParser } from "./semicolon";

export const extrasInstructions = [
    SemicolonParser,
    EqualsParser,
    OperatorParser,
];