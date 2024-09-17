import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class ParenthesesGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Parentheses";
    }

    async handle(node: InternalInstructionNode<Context["Parentheses"]>): Promise<string> {
        return `(${await this.generator.generate(node.context.children)})` + (node.context.children.length === 1 ? ".at(-1)" : "");
    }    
}