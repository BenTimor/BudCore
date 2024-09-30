import { VariableAssignGenerator } from "./assign";
import { VariableDeclarationGenerator } from "./declaration";
import { ExportGenerator } from "./export";
import { VariableReadGenerator } from "./read";

export const variableGenerators = [
    VariableDeclarationGenerator,
    VariableReadGenerator,
    VariableAssignGenerator,
    ExportGenerator,
]