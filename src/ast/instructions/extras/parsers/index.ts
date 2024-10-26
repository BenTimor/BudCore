import { ArrayEndParser, ArrayParser } from "./array";
import { EqualsParser } from "./equals";
import { IndexingParser } from "./indexing";
import { NotParser } from "./not";
import { OperatorParser } from "./operator";
import { ParenthesesEndParser, ParenthesesParser } from "./parentheses";
import { ProxyParser } from "./proxy";
import { SemicolonParser } from "./semicolon";
import { TypeParser } from "./type";

export const extrasInstructions = [
    SemicolonParser,
    EqualsParser,
    OperatorParser,
    ParenthesesParser,
    ParenthesesEndParser,
    ProxyParser,
    ArrayParser,
    ArrayEndParser,
    TypeParser,
    NotParser,
    IndexingParser,
];