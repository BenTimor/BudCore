import { describe, test, expect } from "vitest";
import { buildAST as _buildAST } from "../../../src/ast";
import { Context, InternalInstructionNode } from "../../../src/ast/types";

const buildAST = (code: string) => _buildAST(code, "", false);

describe('AST Data In Variables', () => {
    test("should assign correct number to variable", () => {
        const code = "set a = 1;";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const varContext = varNode.context as Context["VariableDeclaration"];

        expect(varContext).toBeDefined();
        expect(varContext.value?.instruction).toBe("Number");

        const numberContext = (varContext.value as InternalInstructionNode<Context["Number"]>).context;

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

        const varContext = varNode.context as Context["VariableDeclaration"];

        expect(varContext).toBeDefined();
        expect(varContext.value?.instruction).toBe("Operator");

        const operatorContext = (varContext.value as InternalInstructionNode<Context["Operator"]>).context;

        expect(operatorContext.function).toBe("NativeNumberAdd");
    });

    test("Performing operations on variables", () => {
        const code = "set a = 1;\nset b = 2;\nset c = a + b;";
        const ast = buildAST(code);

        expect(ast.length).toBe(3);

        const varNode = ast[2];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const varContext = varNode.context as Context["VariableDeclaration"];

        expect(varContext).toBeDefined();
        expect(varContext.value?.instruction).toBe("Operator");

        const operatorContext = (varContext.value as InternalInstructionNode<Context["Operator"]>).context;

        expect(operatorContext.function).toBe("NativeNumberAdd");
        expect(operatorContext.left.instruction).toBe("VariableRead");
        expect(operatorContext.right.instruction).toBe("VariableRead");
    });
});