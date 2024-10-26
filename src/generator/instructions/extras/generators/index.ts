import { ArrayGenerator } from "./array";
import { IndexingGenerator } from "./indexing";
import { LiteralGenerator } from "./literal";
import { NotGenerator } from "./not";
import { OperatorsGenerator } from "./operators";
import { ParenthesesGenerator } from "./parentheses";
import { SemicolonGenerator } from "./semicolon";
import { TypeGenerator } from "./types";

export const extrasGenerators = [
    SemicolonGenerator,
    ArrayGenerator,
    IndexingGenerator,
    OperatorsGenerator,
    ParenthesesGenerator,
    LiteralGenerator,
    TypeGenerator,
    NotGenerator,
];