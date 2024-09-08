import { describe, test, expect } from "vitest";
import { buildAST } from "../../../src/ast";

describe('AST Variables', () => {
    test("should parse variable declaration", () => {
        const code = "set a = 1;";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const context = varNode.context;

        expect(context).toBeDefined();
        expect(context!.name).toBe("a");
    });

    test("shouldn't allow variable redeclaration", () => {
        const code = "set a = 1;\nset a = 2;";
        expect(() => buildAST(code)).toThrow();
    });

    test("Assign variable to another variable", () => {
        const code = "set a = 1;\nset b = a;";
        const ast = buildAST(code);

        expect(ast.length).toBe(2);

        const varNode = ast[1];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const context = varNode.context;

        expect(context).toBeDefined();
        expect(context!.name).toBe("b");
    });

    test("Shouldn't read not existing variable", () => {
        const code = "a";
        expect(() => buildAST(code)).toThrow();
    });

    test("Shouldn't read variable before declaration", () => {
        const code = "a\nset a = 1;";
        expect(() => buildAST(code)).toThrow();
    });

    test("Shouldn't set variable without equals sign", () => {
        const code = "set a 1;";
        expect(() => buildAST(code)).toThrow();
    });

    test("Set mutable variable", () => {
        const code = "set mut a = 1 ;";
        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const context = varNode.context;

        expect(context).toBeDefined();
        expect(context!.name).toBe("a");
        expect(context!.mutable).toBe(true);
    });

    test("Change mutable variable", () => {
        const code = "set mut a=1 ;\na = 2;";
        const ast = buildAST(code);

        expect(ast.length).toBe(2);

        const varNode = ast[1];

        expect(varNode.instruction).toBe("VariableAssignment");

        const context = varNode.context;

        expect(context).toBeDefined();
        expect(context!.name).toBe("a");
    });

    test("Change immutable variable", () => {
        const code = "set a = 1;\na = 2;";
        expect(() => buildAST(code)).toThrow();
    });

    test("Shouldn't set variable without semicolon", () => {
        const code = "set a = 1";
        expect(() => buildAST(code)).toThrow();
    });

    test("Shouldn't change variable without semicolon", () => {
        const code = "set a = 1;\na = 2";
        expect(() => buildAST(code)).toThrow();
    });
});