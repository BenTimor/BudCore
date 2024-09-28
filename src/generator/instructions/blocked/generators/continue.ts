import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class ContinueGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Continue";
    }

    async handle(node: InternalInstructionNode<Context["Continue"]>): Promise<string> {
        return `bud.continue(${JSON.stringify(node.context.identifier)})`;
    }
}