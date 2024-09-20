import { Context, InternalInstructionNode } from "../../types";

const numberType: InternalInstructionNode<Context["Type"]> = {
    instruction: "Type",
    endsAt: -1,
    context: {
        type: {
            name: "type",
            type: {
                name: "number",
            }
        }
    },
};

export const numberNode: InternalInstructionNode<Context["VariableDeclaration"]> = {
    instruction: "VariableDeclaration",
    identifier: "VAR_DECLARATION_NUMBER_TYPE",
    endsAt: -1,
    context: {
        name: "number",
        mutable: false,
        type: numberType.context.type,
        value: numberType,
    },
};