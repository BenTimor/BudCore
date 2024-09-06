import { describe, test, expect } from "vitest";
import { astBuilder } from "../../../src";

describe('AST Variables', () => {
    test("should parse variable declaration", () => {
        const code = "set a = 1";
        const ast = astBuilder.fromContent(code);

        expect(ast.length).toBe(1);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const context = varNode.context;

        expect(context).toBeDefined();
        expect(context!.name).toBe("a");
    });
});