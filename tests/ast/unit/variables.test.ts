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

    test("Assign variable to another variable", () => {
        const astBuilder = astBuilderFactory();
        const code = "set a = 1\nset b = a";
        const ast = astBuilder.fromContent(code);

        expect(ast.length).toBe(2);

        const varNode = ast[1];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const context = varNode.context;

        expect(context).toBeDefined();
        expect(context!.name).toBe("b");
    });

    test("Shouldn't read not existing variable", () => {
        const astBuilder = astBuilderFactory();
        const code = "a";
        expect(() => astBuilder.fromContent(code)).toThrow();
    });

    test("Shouldn't read variable before declaration", () => {
        const astBuilder = astBuilderFactory();
        const code = "a\nset a = 1";
        expect(() => astBuilder.fromContent(code)).toThrow();
    });

    test("Shouldn't set variable without equals sign", () => {
        const astBuilder = astBuilderFactory();
        const code = "set a 1";
        expect(() => astBuilder.fromContent(code)).toThrow();
    });

    test("Set mutable variable", () => {
        const astBuilder = astBuilderFactory();
        const code = "set mut a = 1";
        const ast = astBuilder.fromContent(code);

        expect(ast.length).toBe(1);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const context = varNode.context;

        expect(context).toBeDefined();
        expect(context!.name).toBe("a");
        expect(context!.mutable).toBe(true);
    });
});