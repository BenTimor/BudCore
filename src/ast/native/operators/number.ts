import { NativeOperatorsMap } from "../../types/operators";

export const numberOperators: NativeOperatorsMap = {
    "+": [{
        precedence: 1,
        leftType: "number",
        rightType: "number",
        returnType: "number",
        functionIdentifier: "NativeNumberAdd",
    }],
    "-": [{
        precedence: 1,
        leftType: "number",
        rightType: "number",
        returnType: "number",
        functionIdentifier: "NativeNumberSubtract",
    }],
    "*": [{
        precedence: 2,
        leftType: "number",
        rightType: "number",
        returnType: "number",
        functionIdentifier: "NativeNumberMultiply",
    }],
    "/": [{
        precedence: 2,
        leftType: "number",
        rightType: "number",
        returnType: "number",
        functionIdentifier: "NativeNumberDivide",
    }],
    "%": [{
        precedence: 2,
        leftType: "number",
        rightType: "number",
        returnType: "number",
        functionIdentifier: "NativeNumberModulo",
    }],
    "^": [{
        precedence: 3,
        leftType: "number",
        rightType: "number",
        returnType: "number",
        functionIdentifier: "NativeNumberPower",
    }],
};