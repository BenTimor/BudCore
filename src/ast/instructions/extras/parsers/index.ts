import { ArrayEndParser, ArrayParser } from "./array";
import { BlockEndParser, BlockParser, BlockStartParser } from "./block";
import { EqualsParser } from "./equals";
import { OperatorParser } from "./operator";
import { ParenthesesEndParser, ParenthesesParser } from "./parentheses";
import { ProxyParser } from "./proxy";
import { ReturnIdentifierParser, ReturnParser } from "./return";
import { SemicolonParser } from "./semicolon";
import { TypeParser } from "./type";

export const extrasInstructions = [
    SemicolonParser,
    EqualsParser,
    OperatorParser,
    ParenthesesParser,
    ParenthesesEndParser,
    BlockParser,
    BlockEndParser,
    BlockStartParser,
    ProxyParser,
    ArrayParser,
    ArrayEndParser,
    TypeParser,
    ReturnParser,
    ReturnIdentifierParser,
];