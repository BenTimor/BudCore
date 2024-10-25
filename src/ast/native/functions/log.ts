import { Context, InternalInstructionNode } from "../../types";
import { AnyType, ArrayType, FunctionParameterType, FunctionSpread, FunctionType, VoidType } from "../../types/types";

const logDeclarationNode: InternalInstructionNode<Context["NativeFunction"]> = {
    instruction: "NativeFunction",
    endsAt: -1,
    context: {
        name: "NativeLog",
        type: new FunctionType([
            new FunctionParameterType("values", new ArrayType(new AnyType()), false, false),
        ], new VoidType(), FunctionSpread.ArraySpread),
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