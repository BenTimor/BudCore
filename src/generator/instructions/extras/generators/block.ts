import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class BlockGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Block";
    }

    async handle(node: InternalInstructionNode<Context["Block"]>): Promise<string> {
        return await this.generator.generate(node.context.children);
    }
}