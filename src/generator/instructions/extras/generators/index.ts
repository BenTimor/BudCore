import { ArrayGenerator } from "./array";
import { OperatorsGenerator } from "./operators";
import { ParenthesesGenerator } from "./parentheses";
import { SemicolonGenerator } from "./semicolon";

export const extrasGenerators = [
    SemicolonGenerator,
    ArrayGenerator,
    OperatorsGenerator,
    ParenthesesGenerator,
];