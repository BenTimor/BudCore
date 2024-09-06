import { ASTBuilder, InstructionNode, InstructionParser } from "engine";
import { VariablesInstructions } from "./variables";
import { PrimitivesInstructions } from "./primitives";

export type Instructions = 
    | VariablesInstructions
    | PrimitivesInstructions;

export abstract class InternalInstructionParser extends InstructionParser<Instructions> {}

export type InternalInstructionNode = InstructionNode<Instructions>;

export class InternalASTBuilder extends ASTBuilder<Instructions> {}

export * from "./variables";
export * from "./primitives";