import { describe, test, expect } from "vitest";
import { buildAST } from "../../../src/ast";

describe('AST One Operator Happy Flow', () => {
    test("Should parse addition", () => {
        const code = "1 + 2";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const operatorNode = ast[0];

        expect(operatorNode.instruction).toBe("Operator");

        const context = operatorNode.context;

        expect(context.function).toBe("NativeNumberAdd");
        expect(context.left.context.value).toBe(1);
        expect(context.right.context.value).toBe(2);
    });

    test("Should parse subtraction", () => {
        const code = "2 - 3";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const operatorNode = ast[0];

        expect(operatorNode.instruction).toBe("Operator");

        const context = operatorNode.context;

        expect(context.function).toBe("NativeNumberSubtract");
        expect(context.left.context.value).toBe(2);
        expect(context.right.context.value).toBe(3);
    });

    test("Should parse multiplication", () => {
        const code = "1*1";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const operatorNode = ast[0];

        expect(operatorNode.instruction).toBe("Operator");

        const context = operatorNode.context;

        expect(context.function).toBe("NativeNumberMultiply");
        expect(context.left.context.value).toBe(1);
        expect(context.right.context.value).toBe(1);
    });

    test("Should parse division", () => {
        const code = "1 /5";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const operatorNode = ast[0];

        expect(operatorNode.instruction).toBe("Operator");

        const context = operatorNode.context;

        expect(context.function).toBe("NativeNumberDivide");
        expect(context.left.context.value).toBe(1);
        expect(context.right.context.value).toBe(5);
    });

    test("Should parse modulo", () => {
        const code = "1% 1";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const operatorNode = ast[0];

        expect(operatorNode.instruction).toBe("Operator");

        const context = operatorNode.context;

        expect(context.function).toBe("NativeNumberModulo");
        expect(context.left.context.value).toBe(1);
        expect(context.right.context.value).toBe(1);
    });

    test("Should parse power", () => {
        const code = "1 ^ 0";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const operatorNode = ast[0];

        expect(operatorNode.instruction).toBe("Operator");

        const context = operatorNode.context;

        expect(context.function).toBe("NativeNumberPower");
        expect(context.left.context.value).toBe(1);
        expect(context.right.context.value).toBe(0);
    });
});

describe('AST Multiple Operators Happy Flow', () => {
    test("Should parse addition and subtraction", () => {
        const code = "1 + 1 - 1";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const operatorNode = ast[0];

        expect(operatorNode.instruction).toBe("Operator");

        const context = operatorNode.context;

        expect(context.function).toBe("NativeNumberSubtract");
        expect(context.left.context.function).toBe("NativeNumberAdd");

        expect(context.left.context.left.context.value).toBe(1);
        expect(context.left.context.right.context.value).toBe(1);
        expect(context.right.context.value).toBe(1);
    });

    test("Should parse multiplication and division", () => {
        const code = "1 * 100 / 1";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const operatorNode = ast[0];

        expect(operatorNode.instruction).toBe("Operator");

        const context = operatorNode.context;

        expect(context.function).toBe("NativeNumberDivide");
        expect(context.left.context.function).toBe("NativeNumberMultiply");

        expect(context.left.context.left.context.value).toBe(1);
        expect(context.left.context.right.context.value).toBe(100);
        expect(context.right.context.value).toBe(1);
    });

    test("Should parse modulo and power", () => {
        const code = "1 % 34 ^ 5";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const operatorNode = ast[0];

        expect(operatorNode.instruction).toBe("Operator");

        const context = operatorNode.context;

        expect(context.function).toBe("NativeNumberModulo");
        expect(context.right.context.function).toBe("NativeNumberPower");

        expect(context.left.context.value).toBe(1);
        expect(context.right.context.left.context.value).toBe(34);
        expect(context.right.context.right.context.value).toBe(5);
    });

    test("Should parse really complex expression", () => {
        const code = "1 + 2 * 3 / 4 % 5 ^ 6";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const operatorNode = ast[0];

        expect(operatorNode.instruction).toBe("Operator");

        const context = operatorNode.context;

        expect(context.function).toBe("NativeNumberAdd");
        expect(context.right.context.function).toBe("NativeNumberModulo");
        expect(context.right.context.left.context.function).toBe("NativeNumberDivide");
        expect(context.right.context.left.context.left.context.function).toBe("NativeNumberMultiply");
        expect(context.right.context.right.context.function).toBe("NativeNumberPower");

        expect(context.left.context.value).toBe(1);
        expect(context.right.context.left.context.left.context.left.context.value).toBe(2);
        expect(context.right.context.left.context.left.context.right.context.value).toBe(3);
        expect(context.right.context.left.context.right.context.value).toBe(4);
        expect(context.right.context.right.context.left.context.value).toBe(5);
        expect(context.right.context.right.context.right.context.value).toBe(6);
    });

    test("Should calculate correctly with parentheses", () => {
        const code = "(1 + 2) * 3 / (4 % 5) ^ 6";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const operatorNode = ast[0];

        expect(operatorNode.instruction).toBe("Operator");

        expect(operatorNode.context.left.context.left.instruction).toBe("Parentheses");
        expect(operatorNode.context.left.context.left.context.value.context.function).toBe("NativeNumberAdd");

        expect(operatorNode.context.right.context.left.instruction).toBe("Parentheses");
        expect(operatorNode.context.right.context.left.context.value.context.function).toBe("NativeNumberModulo");
    });
});