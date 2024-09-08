import { ExtrasInstructions } from "./extras";
import { FunctionsInstructions } from "./functions";
import { PrimitivesInstructions } from "./primitives";
import { VariablesInstructions } from "./variables";

export type Instructions =
    | VariablesInstructions
    | PrimitivesInstructions
    | ExtrasInstructions
    | FunctionsInstructions;

export * from "./variables";
export * from "./primitives";
export * from "./extras";
export * from "./functions";