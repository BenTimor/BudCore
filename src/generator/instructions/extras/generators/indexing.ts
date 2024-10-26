import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class IndexingGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode<any>) {
        return node.instruction === "Indexing";
    }

    async handle(node: InternalInstructionNode<Context["Indexing"]>) {
        const array = await this.generator.generateOne(node.context.obj);
        const index = await this.generator.generateOne(node.context.index);

        return `${array}[${index}]`;
    }

}