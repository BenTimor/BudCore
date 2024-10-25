import { Type } from "./types";

export type NativeOperator = {
    precedence: number;
    leftType: Type<string>;
    rightType: Type<string>;
    returnType: Type<string>;
    functionIdentifier: string;
};

export type NativeOperatorsMap = {
    [operator: string]: NativeOperator[];
};