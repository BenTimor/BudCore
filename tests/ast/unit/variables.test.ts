import { describe, test, expect } from "vitest";
import { astBuilderFactory } from "../../../src";

describe('AST Variables', () => {
    test("should parse variable declaration", () => {
        const astBuilder = astBuilderFactory();
        const code = "set a = 1";
        const ast = astBuilder.fromContent(code);

        expect(ast.length).toBe(1);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const context = varNode.context;

        expect(context).toBeDefined();
        expect(context!.name).toBe("a");
    });

    test("shouldn't allow variable redeclaration", () => {
        const astBuilder = astBuilderFactory();
        const code = "set a = 1\nset a = 2";
        expect(() => astBuilder.fromContent(code)).toThrow();
    });
});