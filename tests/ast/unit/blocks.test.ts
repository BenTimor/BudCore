import { describe, test, expect } from "vitest";
import { buildAST as _buildAST } from "../../../src/ast";
import { Context } from "../../../src/ast/types";

const buildAST = (code: string) => _buildAST(code, "", false);

describe("AST Block Tests", () => {
    test("Should throw an error when a block is opened but never closed", () => {
        const code = `{`;

        expect(() => buildAST(code)).toThrowError("MissingBlockEnd");
    });

    test("Should create an empty block", () => {
        const code = `{}`;

        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const blockNode = ast[0];

        expect(blockNode.instruction).toBe("Block");

        const context = blockNode.context as Context["Block"];

        expect(context.children.length).toBe(0);
    });

    test("Should create a block with an identifier", () => {
        const code = `_BL { }`;

        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const blockNode = ast[0];

        expect(blockNode.instruction).toBe("Block");

        const context = blockNode.context as Context["Block"];

        expect(context.children.length).toBe(0);
        expect(context.identifier).toBe("BL");
    })
});