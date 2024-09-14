import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class VariableReadGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode) {        
        return node.instruction === "VariableRead";
    }

    async handle(node: InternalInstructionNode<Context["VariableRead"]>) {
        return `Bud.Variables.get("${node.context.identifier}")`;
    }
}