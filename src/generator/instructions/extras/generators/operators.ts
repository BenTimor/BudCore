import { Context, InternalInstructionNode, isTyped } from "../../../../ast/types";
import { FunctionType } from "../../../../ast/types/types";
import { InternalInstructionGenerator } from "../../../types";

export class OperatorsGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Operator";
    }

    async handle(node: InternalInstructionNode<Context["Operator"]>): Promise<string> {
        const leftNode = node.context.left;
        const rightNode = node.context.right;

        if (!isTyped(leftNode) || !isTyped(rightNode)) {
            throw new Error("Expected left and right nodes to be typed");
        }

        const nativeInstruction: InternalInstructionNode<Context["NativeFunction"]> = {
            instruction: "NativeFunction",
            context: {
                name: node.context.function,
                type: {
                    name: "function",
                    parameters: [{
                        name: "left",
                        type: leftNode.context.type,
                        mutable: false,
                        optional: false,
                    }, {
                        name: "right",
                        type: rightNode.context.type,
                        mutable: false,
                        optional: false,
                    }],
                    spread: "NoSpread",
                    returnType: node.context.type,
                },
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
                type: (nativeInstruction.context.type as FunctionType).returnType,
            },
            endsAt: node.endsAt,
        };

        return this.generator.generateOne(callInstruction);
    }
}