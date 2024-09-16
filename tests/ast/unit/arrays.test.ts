import { describe, test, expect } from "vitest";
import { buildAST as _buildAST } from "../../../src/ast";
import { Context } from "../../../src/ast/types";

const buildAST = (code: string) => _buildAST(code, "", false);

describe("AST Array Creation Happy Flow", () => {
    test("Should create an empty array", () => {
        const code = `[]`;

        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const arrayNode = ast[0];

        expect(arrayNode.instruction).toBe("Array");

        const context = arrayNode.context as Context["Array"];

        expect(context.children.length).toBe(0);
    });

    test("Should create an array with elements", () => {
        const code = `[1; 2; 3]`;

        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const arrayNode = ast[0];

        expect(arrayNode.instruction).toBe("Array");

        const context = arrayNode.context as Context["Array"];

        expect(context.children.length).toBe(3);
    });

    test("Should create an array with exactly one element", () => {
        const code = `[1]`;

        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const arrayNode = ast[0];

        expect(arrayNode.instruction).toBe("Array");

        const context = arrayNode.context as Context["Array"];

        expect(context.children.length).toBe(1);
    });
});