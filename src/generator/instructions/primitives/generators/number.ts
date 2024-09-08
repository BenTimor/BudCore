import { InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class NumberGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Number";
    }

    async handle(node: InternalInstructionNode): Promise<string> {
        return node.context.value;
    }
}