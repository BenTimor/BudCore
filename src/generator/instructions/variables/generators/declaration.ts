import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class DeclarationGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode) {
        return node.instruction === "VariableDeclaration";
    }

    async handle(node: InternalInstructionNode<Context["VariableDeclaration"]>) {
        const value = await this.generator.generateOne(node.context.value);
        return `Bud.Variables.set("${node.context.identifier}", ${value})`;
    }
}