import { Context, InternalInstructionNode } from "../../types";

const stringType: InternalInstructionNode<Context["Type"]> = {
    instruction: "Type",
    endsAt: -1,
    context: {
        type: {
            name: "type",
            type: {
                name: "string",
            }
        }
    },
};

export const stringNode: InternalInstructionNode<Context["VariableDeclaration"]> = {
    instruction: "VariableDeclaration",
    identifier: "VAR_DECLARATION_STRING_TYPE",
    endsAt: -1,
    context: {
        name: "string",
        mutable: false,
        type: stringType.context.type,
        value: stringType,
    },
};