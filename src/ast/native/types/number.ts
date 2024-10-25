import { Context, InternalInstructionNode } from "../../types";
import { NumberType, TypeType } from "../../types/types";

const numberType: InternalInstructionNode<Context["Type"]> = {
    instruction: "Type",
    endsAt: -1,
    context: {
        type: new TypeType(),
        value: new NumberType(),
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