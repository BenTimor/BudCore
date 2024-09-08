import { Generator, InstructionGenerator } from "engine";
import { InternalInstructionNode } from "../../ast/types";

export const InternalInstructionGenerator = InstructionGenerator<InternalInstructionNode>;
export const InternalGenerator = Generator;