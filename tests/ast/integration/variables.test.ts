import { describe, test, expect } from "vitest";
import { buildAST } from "../../../src";

describe('AST Data In Variables', () => {
    test("should assign correct number to variable", () => {
        const code = "set a = 1;";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const varContext = varNode.context;

        expect(varContext).toBeDefined();
        expect(varContext!.value.instruction).toBe("Number");

        const numberContext = varContext!.value.context;

        expect(numberContext).toBeDefined();
        expect(numberContext!.value).toBe(1);
    });

    test("Multiple variables should be assigned", () => {
        const code = "set a = 1;\nset b = 2;";
        const ast = buildAST(code);

        expect(ast.length).toBe(2);
        ast.forEach(node => expect(node.instruction).toBe("VariableDeclaration"));
    });

    test("Assigning numbers with operations to variable", () => {
        const code = "set a = 1 + 2;";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const varContext = varNode.context;

        expect(varContext).toBeDefined();
        expect(varContext.value.instruction).toBe("Operator");

        const operatorContext = varContext.value.context;

        expect(operatorContext.function).toBe("NativeNumberAdd");
    });

    test("Performing operations on variables", () => {
        const code = "set a = 1;\nset b = 2;\nset c = a + b;";
        const ast = buildAST(code);

        expect(ast.length).toBe(3);

        const varNode = ast[2];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const varContext = varNode.context;

        expect(varContext).toBeDefined();
        expect(varContext.value.instruction).toBe("Operator");

        const operatorContext = varContext.value.context;

        expect(operatorContext.function).toBe("NativeNumberAdd");
        expect(operatorContext.left.instruction).toBe("VariableRead");
        expect(operatorContext.right.instruction).toBe("VariableRead");
    });
});