import { ArrayGenerator } from "./array";
import { BlockGenerator } from "./block";
import { LiteralGenerator } from "./literal";
import { NotGenerator } from "./not";
import { OperatorsGenerator } from "./operators";
import { ParenthesesGenerator } from "./parentheses";
import { ReturnGenerator } from "./return";
import { SemicolonGenerator } from "./semicolon";
import { TypeGenerator } from "./types";

export const extrasGenerators = [
    SemicolonGenerator,
    ArrayGenerator,
    OperatorsGenerator,
    ParenthesesGenerator,
    BlockGenerator,
    LiteralGenerator,
    TypeGenerator,
    ReturnGenerator,
    NotGenerator,
];