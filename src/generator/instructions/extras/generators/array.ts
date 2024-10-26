import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class ArrayGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode<any>) {
        return node.instruction === "Array";
    }

    async handle(node: InternalInstructionNode<Context["Array"]>) {
        const values = await Promise.all(node.context.children.map((child: InternalInstructionNode) => this.generator.generateOne(child)));
        return `bud.array([${values.join(", ")}])`;
    }
}