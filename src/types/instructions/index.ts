import { ASTBuilder, InstructionNode, InstructionParser } from "engine";
import { VariablesInstructions } from "./variables";
import { PrimitivesInstructions } from "./primitives";
import { Injections } from "../injections";
import { ExtrasInstructions } from "./extras";

export type Instructions = 
    | VariablesInstructions
    | PrimitivesInstructions
    | ExtrasInstructions;

export abstract class InternalInstructionParser extends InstructionParser<Instructions, Injections> {}

export type InternalInstructionNode = InstructionNode<Instructions>;

export class InternalASTBuilder extends ASTBuilder<Instructions, Injections> {}

export * from "./variables";
export * from "./primitives";