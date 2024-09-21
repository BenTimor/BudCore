import { describe, test, expect } from "vitest";
import { buildAST as _buildAST } from "../../../src/ast";
import { Context } from "../../../src/ast/types";

const buildAST = (code: string) => _buildAST(code, "", false);

describe("AST Numbers", () => {
    test("Should parse numbers", () => {
        const code = "1";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const numberNode = ast[0];

        expect(numberNode.instruction).toBe("Number");

        const context = numberNode.context as Context["Number"];
        
        expect(context).toBeDefined();
        expect(context.value).toBe(1);
    });

    test("Should parse strings", () => {
        const code = `"Hello, World!"`;
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const stringNode = ast[0];

        expect(stringNode.instruction).toBe("String");

        const context = stringNode.context as Context["String"];
        
        expect(context).toBeDefined();
        expect(context.value).toBe("Hello, World!");
    });
});