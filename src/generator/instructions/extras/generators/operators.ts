import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class OperatorsGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Operator";
    }

    async handle(node: InternalInstructionNode<Context["Operator"]>): Promise<string> {
        const nativeFunctionInstruction: InternalInstructionNode<Context["FunctionCall"]> = {
            instruction: "FunctionCall",
            context: {
                args: {
                    left: node.context.left,
                    right: node.context.right,
                },
                identifier: node.context.function,
                type: node.context.type,
            },
            endsAt: node.endsAt,
        };

        return this.generator.generateOne(nativeFunctionInstruction);
    }
}