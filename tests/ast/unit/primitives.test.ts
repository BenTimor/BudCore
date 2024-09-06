import { describe, test, expect } from "vitest";
import { astBuilderFactory } from "../../../src";

describe("Numbers", () => {
    test("should parse numbers", () => {
        const astBuilder = astBuilderFactory();
        const code = "1";
        const ast = astBuilder.fromContent(code);

        expect(ast.length).toBe(1);

        const numberNode = ast[0];

        expect(numberNode.instruction).toBe("Number");

        const context = numberNode.context;
        
        expect(context).toBeDefined();
        expect(context!.value).toBe(1);
    });
});