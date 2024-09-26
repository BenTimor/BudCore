import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class NotGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Not";
    }

    async handle(node: InternalInstructionNode<Context["Not"]>): Promise<string> {
        return `!(${await this.generator.generateOne(node.context.value)})`;
    }
}