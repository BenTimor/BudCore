import { describe, test, expect } from "vitest";
import { buildAST } from "../../../src/ast";
import { Context } from "../../../src/ast/types";

describe("Conditions", () => {
    test("Should parse if statements without parentheses", () => {
        const code = `
            if true {
                set a = 1;
            }
        `;

        const ast = buildAST(code);

        const ifNode = ast.at(-1);

        expect(ifNode).toBeDefined();
        expect(ifNode!.instruction).toBe("If");

        const context = ifNode!.context as Context["If"];

        expect(context).toBeDefined();
        expect(context.condition.instruction).toBe("VariableRead");
        expect(context.block).toBeDefined();
    });

    test("Should parse if statements with parentheses", () => {
        const code = `
            if (true) {
                set a = 1;
            }
        `;

        const ast = buildAST(code);

        const ifNode = ast.at(-1);

        expect(ifNode).toBeDefined();
        expect(ifNode!.instruction).toBe("If");

        const context = ifNode!.context as Context["If"];

        expect(context).toBeDefined();
        expect(context.condition.instruction).toBe("Parentheses");
        expect(context.block).toBeDefined();
    });
})