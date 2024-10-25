import { NativeOperatorsMap } from "../../types/operators";
import { NumberType } from "../../types/types";

export const numberOperators: NativeOperatorsMap = {
    "+": [{
        precedence: 1,
        leftType: new NumberType(),
        rightType: new NumberType(),
        returnType: new NumberType(),
        functionIdentifier: "NativeNumberAdd",
    }],
    "-": [{
        precedence: 1,
        leftType: new NumberType(),
        rightType: new NumberType(),
        returnType: new NumberType(),
        functionIdentifier: "NativeNumberSubtract",
    }],
    "*": [{
        precedence: 2,
        leftType: new NumberType(),
        rightType: new NumberType(),
        returnType: new NumberType(),
        functionIdentifier: "NativeNumberMultiply",
    }],
    "/": [{
        precedence: 2,
        leftType: new NumberType(),
        rightType: new NumberType(),
        returnType: new NumberType(),
        functionIdentifier: "NativeNumberDivide",
    }],
    "%": [{
        precedence: 2,
        leftType: new NumberType(),
        rightType: new NumberType(),
        returnType: new NumberType(),
        functionIdentifier: "NativeNumberModulo",
    }],
    "^": [{
        precedence: 3,
        leftType: new NumberType(),
        rightType: new NumberType(),
        returnType: new NumberType(),
        functionIdentifier: "NativeNumberPower",
    }],
};