import { ArrayGenerator } from "./array";
import { LiteralGenerator } from "./literal";
import { NotGenerator } from "./not";
import { OperatorsGenerator } from "./operators";
import { ParenthesesGenerator } from "./parentheses";
import { SemicolonGenerator } from "./semicolon";
import { TypeGenerator } from "./types";

export const extrasGenerators = [
    SemicolonGenerator,
    ArrayGenerator,
    OperatorsGenerator,
    ParenthesesGenerator,
    LiteralGenerator,
    TypeGenerator,
    NotGenerator,
];