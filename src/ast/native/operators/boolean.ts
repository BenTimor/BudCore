import { NativeOperatorsMap } from "../../types/operators";

export const booleanOperators: NativeOperatorsMap = {
    ">": [{
        precedence: 0,
        leftType: {
            name: "number",
        },
        rightType: {
            name: "number",
        },
        returnType: {
            name: "boolean",
        },
        functionIdentifier: "NativeNumberGreaterThan",
    }],
    "<": [{
        precedence: 0,
        leftType: {
            name: "number",
        },
        rightType: {
            name: "number",
        },
        returnType: {
            name: "boolean",
        },
        functionIdentifier: "NativeNumberLessThan",
    }],
    ">=": [{
        precedence: 0,
        leftType: {
            name: "number",
        },
        rightType: {
            name: "number",
        },
        returnType: {
            name: "boolean",
        },
        functionIdentifier: "NativeNumberGreaterThanOrEqual",
    }],
    "<=": [{
        precedence: 0,
        leftType: {
            name: "number",
        },
        rightType: {
            name: "number",
        },
        returnType: {
            name: "boolean",
        },
        functionIdentifier: "NativeNumberLessThanOrEqual",
    }],
    "==": [{
        precedence: 0,
        leftType: {
            name: "any",
        },
        rightType: {
            name: "any",
        },
        returnType: {
            name: "boolean",
        },
        functionIdentifier: "NativeEqual",
    }],
};