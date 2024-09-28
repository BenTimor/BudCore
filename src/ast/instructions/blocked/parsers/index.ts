import { ElseParser } from "./else";
import { IfParser } from "./if";
import { BlockEndParser, BlockParser, BlockStartParser } from "../../blocked/parsers/block";
import { ReturnIdentifierParser, ReturnParser } from "./return";
import { FunctionDeclarationParser } from "./declaration";

export const blockedInstructions = [
    IfParser,
    ElseParser,
    BlockParser,
    BlockEndParser,
    BlockStartParser,
    ReturnParser,
    ReturnIdentifierParser,
    FunctionDeclarationParser,
];