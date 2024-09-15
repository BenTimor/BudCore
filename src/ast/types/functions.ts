import { InternalInstructionNode } from ".";
import { Type } from "./types";

export type FunctionParameter<InternalInstructionNode> = {
    name: string;
    type: Type;
    mutable: boolean;
    default?: InternalInstructionNode;
};

export type NativeFunction = {
    args: FunctionParameter<any>[];
    returnType: Type;
};

export type NativeFunctionsMap = {
    [functionName: string]: NativeFunction;
};