import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class LiteralGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Literal";
    }

    async handle(node: InternalInstructionNode<Context["Literal"]>): Promise<string> {
        return node.context.value;
    }
}