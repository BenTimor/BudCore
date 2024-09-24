import { Context, InternalInstructionNode } from "../../types";

export const trueNode: InternalInstructionNode<Context["VariableDeclaration"]> = {
    instruction: "VariableDeclaration",
    identifier: "VAR_DECLARATION_TRUE",
    endsAt: -1,
    context: {
        name: "true",
        mutable: false,
        type: {
            name: "boolean",
        },
        value: {
            instruction: "Literal",
            context: {
                value: "true",
            },
            endsAt: -1,
        }
    },
};

export const falseNode: InternalInstructionNode<Context["VariableDeclaration"]> = {
    instruction: "VariableDeclaration",
    identifier: "VAR_DECLARATION_FALSE",
    endsAt: -1,
    context: {
        name: "false",
        mutable: false,
        type: {
            name: "boolean",
        },
        value: {
            instruction: "Literal",
            context: {
                value: "false",
            },
            endsAt: -1,
        }
    },
};