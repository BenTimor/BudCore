import { ArrayGenerator } from "./array";
import { BlockGenerator } from "./block";
import { OperatorsGenerator } from "./operators";
import { ParenthesesGenerator } from "./parentheses";
import { SemicolonGenerator } from "./semicolon";

export const extrasGenerators = [
    SemicolonGenerator,
    ArrayGenerator,
    OperatorsGenerator,
    ParenthesesGenerator,
    BlockGenerator,
];