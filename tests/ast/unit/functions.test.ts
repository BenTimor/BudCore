import { describe, test, expect } from "vitest";
import { buildAST as _buildAST } from "../../../src/ast";
import { Context } from "../../../src/ast/types";

const buildAST = (code: string) => _buildAST(code, "", false);

describe("AST One Function Happy Flow", () => {
    test("Should create an empty function node", () => {
        const code = `() => {}`;

        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const functionNode = ast[0];

        expect(functionNode.instruction).toBe("FunctionDeclaration");
    });

    test("Should create a function with parameters", () => {
        const code = `(set a; set b;) => {}`;

        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const functionNode = ast[0];

        expect(functionNode.instruction).toBe("FunctionDeclaration");

        const context = functionNode.context as Context["FunctionDeclaration"];

        expect(context.parameters.length).toBe(2);
    });
});