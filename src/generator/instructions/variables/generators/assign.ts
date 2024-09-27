import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class VariableAssignGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode) {
        return node.instruction === "VariableAssignment";
    }

    async handle(node: InternalInstructionNode<Context["VariableAssignment"]>) {
        const valueNode = node.context.value;
        const value = valueNode ? await this.generator.generateOne(valueNode) : undefined;
        return `bud.variables.set("${node.context.identifier}", ${value})`;
    }
}