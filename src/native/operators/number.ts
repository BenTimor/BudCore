import { NativeOperatorsMap } from "../../types/operators";

export const numberOperators: NativeOperatorsMap = {
    "+": [{
        precedence: 1,
        leftType: "number",
        rightType: "number",
        functionIdentifier: "NativeNumberAdd",
    }],
    "-": [{
        precedence: 1,
        leftType: "number",
        rightType: "number",
        functionIdentifier: "NativeNumberSubtract",
    }],
    "*": [{
        precedence: 2,
        leftType: "number",
        rightType: "number",
        functionIdentifier: "NativeNumberMultiply",
    }],
    "/": [{
        precedence: 2,
        leftType: "number",
        rightType: "number",
        functionIdentifier: "NativeNumberDivide",
    }],
    "%": [{
        precedence: 2,
        leftType: "number",
        rightType: "number",
        functionIdentifier: "NativeNumberModulo",
    }],
    "^": [{
        precedence: 3,
        leftType: "number",
        rightType: "number",
        functionIdentifier: "NativeNumberPower",
    }],
};