import { describe, test, expect } from "vitest";
import { buildAST } from "../../../src/ast";
import { Context } from "../../../src/ast/types";

describe("Types and variables", () => {
    test("Variable declaration with a type", () => {
        const code = `set a: number = 1;`;

        const ast = buildAST(code);

        const varNode = ast.at(-1);

        expect(varNode).toBeDefined();
        expect(varNode!.instruction).toBe("VariableDeclaration");

        const varContext = varNode!.context as Context["VariableDeclaration"];

        expect(varContext).toBeDefined();
        expect(varContext.type).toBeDefined();
        expect(varContext.type?.name).toBe("number");
    });

    test("Should not allow wrong types", () => {
        const code = `set a: number = "1";`;

        expect(() => buildAST(code)).toThrow();
    });

    test("Should infer type from value", () => {
        const code = `set a = 1;`;

        const ast = buildAST(code);

        const varNode = ast.at(-1);

        expect(varNode).toBeDefined();
        expect(varNode!.instruction).toBe("VariableDeclaration");

        const varContext = varNode!.context as Context["VariableDeclaration"];

        expect(varContext).toBeDefined();
        expect(varContext.type?.name).toBe("number");
    });

    test("Should set empty variable to any", () => {
        const code = `set a;`;

        const ast = buildAST(code);

        const varNode = ast.at(-1);

        expect(varNode).toBeDefined();
        expect(varNode!.instruction).toBe("VariableDeclaration");

        const varContext = varNode!.context as Context["VariableDeclaration"];

        expect(varContext).toBeDefined();
        expect(varContext.type?.name).toBe("any");
    });
});