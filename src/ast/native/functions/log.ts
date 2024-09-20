import { Context, InternalInstructionNode } from "../../types";

const logDeclarationNode: InternalInstructionNode<Context["NativeFunction"]> = {
    instruction: "NativeFunction",
    endsAt: -1,
    context: {
        name: "NativeLog",
        type: {
            name: "function",
            spread: "ArraySpread",
            parameters: [
                {
                    name: "values",
                    type: {
                        name: "array",
                        elementType: {
                            name: "any",
                        }
                    },
                    mutable: false,
                    optional: false,
                }
            ],
            returnType: {
                name: "void",
            }
        }
    }
};

export const logNode: InternalInstructionNode<Context["VariableDeclaration"]> = {
    instruction: "VariableDeclaration",
    identifier: "VAR_DECLARATION_NATIVE_LOG",
    endsAt: -1,
    context: {
        name: "log",
        mutable: false,
        type: logDeclarationNode.context.type,
        value: logDeclarationNode,
    },
};