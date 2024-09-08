import { InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class ReadGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode) {        
        return node.instruction === "VariableRead";
    }

    async handle(node: InternalInstructionNode) {
        return `Bud.Memory.get("${node.context.identifier}")`;
    }
}