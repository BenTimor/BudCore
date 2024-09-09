import { AssignmentParser } from "./assign";
import { DeclarationParser } from "./declaration";
import { MutableParser } from "./mutable";
import { VariableNameParser } from "./name";
import { ReadParser } from "./read";

export const variablesInstructions = [
    DeclarationParser,
    VariableNameParser,
    AssignmentParser,
    ReadParser,
    MutableParser,
];