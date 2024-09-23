import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class ParenthesesGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Parentheses";
    }

    async handle(node: InternalInstructionNode<Context["Parentheses"]>): Promise<string> {
        return `(${await this.generateInParentheses(node.context.children)})`;
    }    
}