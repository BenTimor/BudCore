import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class BlockGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Block";
    }

    async handle(node: InternalInstructionNode<Context["Block"]>): Promise<string> {
        return await this.generateInBlock(node.context.identifier, node.context.children);
    }
}