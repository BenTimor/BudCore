import { ASTBuilder, InstructionNode, InstructionParser, ReturnedInstructionNode } from "engine";
import { Instructions } from "../../types/instructions";
import { Types } from "./types";
import { Injections } from "./injections";

export * from "./memory";
export * from "./injections";

export type InternalInstructionNode = InstructionNode<Instructions, { type: Types } & Record<string, any>>;

export type ReturnedInternalInstructionNode = ReturnedInstructionNode<InternalInstructionNode>;

export abstract class InternalInstructionParser extends InstructionParser<InternalInstructionNode, Instructions, Injections> { }

export class InternalASTBuilder extends ASTBuilder<InternalInstructionNode, Instructions, Injections> { }