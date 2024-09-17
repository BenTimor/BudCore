import { FunctionCallGenerator } from "./call";
import { FunctionDeclarationGenerator } from "./declaration";
import { NativeFunctionGenerator } from "./native";

export const functionGenerators = [
    FunctionCallGenerator,
    NativeFunctionGenerator,
    FunctionDeclarationGenerator,
];