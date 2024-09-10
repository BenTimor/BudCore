import { InternalInstructionNode } from ".";
import { Types } from "./types";

export type FunctionParameter<InternalInstructionNode> = {
    name: string;
    type: Types;
    mutable: boolean;
    default?: InternalInstructionNode;
};

export type NativeFunction = {
    args: FunctionParameter<any>[];
    returnType: Types;
};

export type NativeFunctionsMap = {
    [functionName: string]: NativeFunction;
};