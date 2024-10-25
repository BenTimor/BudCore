import { Context, InternalInstructionNode } from "../../types";
import { FunctionParameterType, FunctionSpread, FunctionType, StringType } from "../../types/types";

const ranDeclarationNode: InternalInstructionNode<Context["NativeFunction"]> = {
    instruction: "NativeFunction",
    endsAt: -1,
    context: {
        name: "NativeBlockRan",
        type: new FunctionType([
            new FunctionParameterType("id", new StringType(), false, false),
        ], new StringType(), FunctionSpread.NoSpread),
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