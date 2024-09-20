import { InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class TypeGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Type";
    }

    async handle(node: InternalInstructionNode): Promise<string> {
        return "undefined"; // TODO Rethink what to generate for types
    }
    
}