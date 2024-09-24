import { Context, InternalInstructionNode } from "../../types";

const ranDeclarationNode: InternalInstructionNode<Context["NativeFunction"]> = {
    instruction: "NativeFunction",
    endsAt: -1,
    context: {
        name: "NativeBlockRan",
        type: {
            name: "function",
            spread: "NoSpread",
            parameters: [
                {
                    name: "id",
                    type: {
                        name: "string",
                    },
                    mutable: false,
                    optional: false,
                }
            ],
            returnType: {
                name: "boolean",
            }
        }
    }
};

export const ranNode: InternalInstructionNode<Context["VariableDeclaration"]> = {
    instruction: "VariableDeclaration",
    identifier: "VAR_DECLARATION_NATIVE_RAN",
    endsAt: -1,
    context: {
        name: "ran",
        mutable: false,
        type: ranDeclarationNode.context.type,
        value: ranDeclarationNode,
    },
};