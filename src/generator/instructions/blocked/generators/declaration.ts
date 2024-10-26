import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class FunctionDeclarationGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "FunctionDeclaration";
    }

    async handle(node: InternalInstructionNode<Context["FunctionDeclaration"]>): Promise<string> {
        const params = "{ " + node.context.type.parameters.map(param => param.paramName).join(", ") + " }";

        return `(${params}) => { return ${await this.generator.generateOne(node.context.block)} }`
    }
}