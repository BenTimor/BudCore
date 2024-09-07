import { EqualsParser } from "./equals";
import { OperatorParser } from "./operator";
import { ParenthesesEndParser, ParenthesesParser } from "./parentheses";
import { SemicolonParser } from "./semicolon";

export const extrasInstructions = [
    SemicolonParser,
    EqualsParser,
    OperatorParser,
    ParenthesesParser,
    ParenthesesEndParser,
];