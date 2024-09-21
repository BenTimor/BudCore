import { ConditionInstructions } from "./conditions";
import { ExtrasInstructions } from "./extras";
import { FunctionsInstructions } from "./functions";
import { NativeInstructions } from "./native";
import { PrimitivesInstructions } from "./primitives";
import { VariablesInstructions } from "./variables";

export type Instructions =
    | VariablesInstructions
    | PrimitivesInstructions
    | ExtrasInstructions
    | FunctionsInstructions
    | NativeInstructions
    | ConditionInstructions;

export * from "./variables";
export * from "./primitives";
export * from "./extras";
export * from "./functions";