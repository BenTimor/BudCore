import { describe, test, expect } from "vitest";
import { buildAST } from "../../../src/ast";

describe("AST Numbers", () => {
    test("Should parse numbers", () => {
        const code = "1";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const numberNode = ast[0];

        expect(numberNode.instruction).toBe("Number");

        const context = numberNode.context;
        
        expect(context).toBeDefined();
        expect(context!.value).toBe(1);
    });
});