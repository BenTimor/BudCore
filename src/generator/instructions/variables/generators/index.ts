import { VariableAssignGenerator } from "./assign";
import { VariableDeclarationGenerator } from "./declaration";
import { VariableReadGenerator } from "./read";

export const variableGenerators = [
    VariableDeclarationGenerator,
    VariableReadGenerator,
    VariableAssignGenerator,
]