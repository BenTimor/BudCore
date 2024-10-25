import { NativeOperatorsMap } from "../../types/operators";
import { AnyType, BooleanType, NumberType } from "../../types/types";

export const booleanOperators: NativeOperatorsMap = {
    ">": [{
        precedence: 0,
        leftType: new NumberType(),
        rightType: new NumberType(),
        returnType: new BooleanType(),
        functionIdentifier: "NativeNumberGreaterThan",
    }],
    "<": [{
        precedence: 0,
        leftType: new NumberType(),
        rightType: new NumberType(),
        returnType: new BooleanType(),
        functionIdentifier: "NativeNumberLessThan",
    }],
    ">=": [{
        precedence: 0,
        leftType: new NumberType(),
        rightType: new NumberType(),
        returnType: new BooleanType(),
        functionIdentifier: "NativeNumberGreaterThanOrEqual",
    }],
    "<=": [{
        precedence: 0,
        leftType: new NumberType(),
        rightType: new NumberType(),
        returnType: new BooleanType(),
        functionIdentifier: "NativeNumberLessThanOrEqual",
    }],
    "==": [{
        precedence: 0,
        leftType: new AnyType(),
        rightType: new AnyType(),
        returnType: new BooleanType(),
        functionIdentifier: "NativeEqual",
    }],
};