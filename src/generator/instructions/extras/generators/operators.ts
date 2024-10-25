import { Context, InternalInstructionNode, isTyped } from "../../../../ast/types";
import { FunctionParameterType, FunctionSpread, FunctionType } from "../../../../ast/types/types";
import { InternalInstructionGenerator } from "../../../types";

export class OperatorsGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Operator";
    }

    async handle(node: InternalInstructionNode<Context["Operator"]>): Promise<string | null> {
        const leftNode = node.context.left;
        const rightNode = node.context.right;

        if (!isTyped(leftNode) || !isTyped(rightNode)) {
            throw new Error("Expected left and right nodes to be typed");
        }

        const nativeInstruction: InternalInstructionNode<Context["NativeFunction"]> = {
            instruction: "NativeFunction",
            context: {
                name: node.context.function,
                type: new FunctionType([
                    new FunctionParameterType("left", leftNode.context.type, false, false),
                    new FunctionParameterType("right", rightNode.context.type, false, false),
                ], node.context.type, FunctionSpread.NoSpread),
            },
            endsAt: node.endsAt,
        };

        const callInstruction: InternalInstructionNode<Context["FunctionCall"]> = {
            instruction: "FunctionCall",
            context: {
                args: {
                    left: node.context.left,
                    right: node.context.right,
                },
                function: nativeInstruction,
                type: (nativeInstruction.context.type as FunctionType).returns,
            },
            endsAt: node.endsAt,
        };

        return this.generator.generateOne(callInstruction);
    }
}