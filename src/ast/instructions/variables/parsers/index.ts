import { VariableAssignmentParser } from "./assign";
import { VariableDeclarationParser } from "./declaration";
import { VariableMutableParser } from "./mutable";
import { VariableNameParser } from "./name";
import { VariableReadParser } from "./read";

export const variablesInstructions = [
    VariableDeclarationParser,
    VariableNameParser,
    VariableAssignmentParser,
    VariableReadParser,
    VariableMutableParser,
];