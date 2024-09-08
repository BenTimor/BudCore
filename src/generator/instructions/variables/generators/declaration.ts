import { InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class DeclarationGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode) {
        return node.instruction === "VariableDeclaration";
    }

    async handle(node: InternalInstructionNode) {
        const value = await this.generator.generateOne(node.context.value);
        return `const ${node.context.name} = new Bud.Variable(${value}, ${node.context.type});`;
    }
}