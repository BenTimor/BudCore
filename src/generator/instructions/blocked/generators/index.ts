import { BlockGenerator } from "./block";
import { FunctionCallGenerator } from "./call";
import { ContinueGenerator } from "./continue";
import { FunctionDeclarationGenerator } from "./declaration";
import { IfGenerator } from "./if";
import { NativeFunctionGenerator } from "./native";
import { ReturnGenerator } from "./return";

export const blockedGenerators = [
    IfGenerator,
    BlockGenerator,
    FunctionCallGenerator,
    FunctionDeclarationGenerator,
    NativeFunctionGenerator,
    ReturnGenerator,
    ContinueGenerator,
];