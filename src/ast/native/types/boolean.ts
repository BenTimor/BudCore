import { Context, InternalInstructionNode } from "../../types";
import { BooleanType, TypeType } from "../../types/types";

const booleanType: InternalInstructionNode<Context["Type"]> = {
    instruction: "Type",
    endsAt: -1,
    context: {
        type: new TypeType(),
        value: new BooleanType(),
    },
};

export const booleanNode: InternalInstructionNode<Context["VariableDeclaration"]> = {
    instruction: "VariableDeclaration",
    identifier: "VAR_DECLARATION_BOOLEAN_TYPE",
    endsAt: -1,
    context: {
        name: "boolean",
        mutable: false,
        type: booleanType.context.type,
        value: booleanType,
    },
};