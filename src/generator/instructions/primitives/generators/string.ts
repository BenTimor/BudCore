import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class StringGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "String";
    }

    async handle(node: InternalInstructionNode<Context["String"]>): Promise<string> {
        return JSON.stringify(node.context.value);
    }
}