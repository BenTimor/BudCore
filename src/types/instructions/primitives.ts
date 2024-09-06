import { InstructionNode, InstructionParser } from "engine";

export type PrimitivesInstructions =
    | "Number";

export abstract class InternalPrimitivesParser extends InstructionParser<PrimitivesInstructions> {}

export type InternalPrimitivesNode = InstructionNode<PrimitivesInstructions>;