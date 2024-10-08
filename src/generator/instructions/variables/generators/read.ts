import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class VariableReadGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode) {        
        return node.instruction === "VariableRead";
    }

    async handle(node: InternalInstructionNode<Context["VariableRead"]>) {
        return `bud.variables.get("${node.context.identifier}")`;
    }
}