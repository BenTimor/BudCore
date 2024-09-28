import { BlockedInstructions } from "./blocked";
import { ExtrasInstructions } from "./extras";
import { NativeInstructions } from "./native";
import { PrimitivesInstructions } from "./primitives";
import { VariablesInstructions } from "./variables";

export type Instructions =
    | VariablesInstructions
    | PrimitivesInstructions
    | ExtrasInstructions
    | NativeInstructions
    | BlockedInstructions;

export * from "./variables";
export * from "./primitives";
export * from "./extras";
export * from "./blocked";