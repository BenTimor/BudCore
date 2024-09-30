import { ArrayGenerator } from "./array";
import { ArrayIndexingGenerator } from "./array-indexing";
import { LiteralGenerator } from "./literal";
import { NotGenerator } from "./not";
import { OperatorsGenerator } from "./operators";
import { ParenthesesGenerator } from "./parentheses";
import { SemicolonGenerator } from "./semicolon";
import { TypeGenerator } from "./types";

export const extrasGenerators = [
    SemicolonGenerator,
    ArrayGenerator,
    ArrayIndexingGenerator,
    OperatorsGenerator,
    ParenthesesGenerator,
    LiteralGenerator,
    TypeGenerator,
    NotGenerator,
];