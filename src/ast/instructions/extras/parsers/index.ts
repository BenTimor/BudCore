import { ArrayEndParser, ArrayParser } from "./array";
import { BlockEndParser, BlockParser } from "./block";
import { EqualsParser } from "./equals";
import { OperatorParser } from "./operator";
import { ParenthesesEndParser, ParenthesesParser } from "./parentheses";
import { ProxyParser } from "./proxy";
import { SemicolonParser } from "./semicolon";

export const extrasInstructions = [
    SemicolonParser,
    EqualsParser,
    OperatorParser,
    ParenthesesParser,
    ParenthesesEndParser,
    BlockParser,
    BlockEndParser,
    ProxyParser,
    ArrayParser,
    ArrayEndParser,
];