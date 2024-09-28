import { ElseParser } from "./else";
import { IfParser } from "./if";
import { BlockEndParser, BlockParser, BlockStartParser } from "../../blocked/parsers/block";
import { ReturnParser } from "./return";
import { FunctionDeclarationParser } from "./declaration";
import { ContinueParser } from "./continue";
import { BlockSpecificationParser } from "./block-specification";

export const blockedInstructions = [
    IfParser,
    ElseParser,
    BlockParser,
    BlockEndParser,
    BlockStartParser,
    ReturnParser,
    FunctionDeclarationParser,
    ContinueParser,
    BlockSpecificationParser,
];