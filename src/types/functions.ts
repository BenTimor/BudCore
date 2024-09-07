import { Types } from "./types";

export type NativeFunctionArg = {
    name: string;
    type: Types;
    spread?: boolean;
};

export type NativeFunction = {
    identifier: string;
    args: NativeFunctionArg[];
    returnType: Types;
};

export type NativeFunctionsMap = {
    [functionName: string]: NativeFunction;
};