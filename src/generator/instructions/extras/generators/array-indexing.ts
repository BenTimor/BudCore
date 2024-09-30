import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class ArrayIndexingGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode<any>) {
        return node.instruction === "ArrayIndexing";
    }

    async handle(node: InternalInstructionNode<Context["ArrayIndexing"]>) {
        const array = await this.generator.generateOne(node.context.array);
        const index = await this.generator.generateOne(node.context.index);

        return `${array}[${index}]`;
    }

}