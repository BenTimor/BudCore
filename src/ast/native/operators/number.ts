import { NativeOperatorsMap } from "../../types/operators";

export const numberOperators: NativeOperatorsMap = {
    "+": [{
        precedence: 1,
        leftType: {
            name: "number",
        },
        rightType: {
            name: "number",
        },
        returnType: {
            name: "number",
        },
        functionIdentifier: "NativeNumberAdd",
    }],
    "-": [{
        precedence: 1,
        leftType: {
            name: "number",
        },
        rightType: {
            name: "number",
        },
        returnType: {
            name: "number",
        },
        functionIdentifier: "NativeNumberSubtract",
    }],
    "*": [{
        precedence: 2,
        leftType: {
            name: "number",
        },
        rightType: {
            name: "number",
        },
        returnType: {
            name: "number",
        },
        functionIdentifier: "NativeNumberMultiply",
    }],
    "/": [{
        precedence: 2,
        leftType: {
            name: "number",
        },
        rightType: {
            name: "number",
        },
        returnType: {
            name: "number",
        },
        functionIdentifier: "NativeNumberDivide",
    }],
    "%": [{
        precedence: 2,
        leftType: {
            name: "number",
        },
        rightType: {
            name: "number",
        },
        returnType: {
            name: "number",
        },
        functionIdentifier: "NativeNumberModulo",
    }],
    "^": [{
        precedence: 3,
        leftType: {
            name: "number",
        },
        rightType: {
            name: "number",
        },
        returnType: {
            name: "number",
        },
        functionIdentifier: "NativeNumberPower",
    }],
};