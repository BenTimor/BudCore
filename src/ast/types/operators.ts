import { Type } from "./types";

export type NativeOperator = {
    precedence: number;
    leftType: Type;
    rightType: Type;
    returnType: Type;
    functionIdentifier: string;
};

export type NativeOperatorsMap = {
    [operator: string]: NativeOperator[];
};