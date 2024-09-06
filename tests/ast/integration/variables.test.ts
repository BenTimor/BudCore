import { describe, test, expect } from "vitest";
import { astBuilder } from "../../../src";

describe('AST Data In Variables', () => {
    test("should assign correct number to variable", () => {
        const code = "set a = 1";
        const ast = astBuilder.fromContent(code);

        expect(ast.length).toBe(1);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const varContext = varNode.context;

        expect(varContext).toBeDefined();
        expect(varContext!.value.instruction).toBe("Number");

        const numberContext = varContext!.value.context;

        expect(numberContext).toBeDefined();
        expect(numberContext!.value).toBe(1);
    });
});