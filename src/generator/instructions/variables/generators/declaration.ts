import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class DeclarationGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode) {
        return node.instruction === "VariableDeclaration";
    }

    async handle(node: InternalInstructionNode<Context["VariableDeclaration"]>) {
        const valueNode = node.context.value;
        const value = valueNode ? await this.generator.generateOne(valueNode) : undefined;
        return `Bud.Variables.set("${node.context.identifier}", ${value})`;
    }
}