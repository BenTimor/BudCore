import { Types } from "./types";

export type NativeOperator = {
    precedence: number;
    leftType: Types;
    rightType: Types;
    returnType: Types;
    functionIdentifier: string;
};

export type NativeOperatorsMap = {
    [operator: string]: NativeOperator[];
};