import { ASTBuilder, InstructionNode, InstructionParser, ReturnedInstructionNode } from "engine";
import { VariablesInstructions } from "./variables";
import { PrimitivesInstructions } from "./primitives";
import { Injections } from "../injections";
import { ExtrasInstructions } from "./extras";
import { Types } from "../types";

export type Instructions =
    | VariablesInstructions
    | PrimitivesInstructions
    | ExtrasInstructions;

export type InternalInstructionNode = InstructionNode<Instructions, { type: Types } & Record<string, any>>;

export type ReturnedInternalInstructionNode = ReturnedInstructionNode<InternalInstructionNode>;

export abstract class InternalInstructionParser extends InstructionParser<InternalInstructionNode, Instructions, Injections> { }

export class InternalASTBuilder extends ASTBuilder<InternalInstructionNode, Instructions, Injections> { }

export * from "./variables";
export * from "./primitives";