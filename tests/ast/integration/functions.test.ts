import { describe, test, expect } from "vitest";
import { buildAST as _buildAST } from "../../../src/ast";
import { Context } from "../../../src/ast/types";

const buildAST = (code: string) => _buildAST(code, "", false);

describe('AST Functions and Variables integration', () => {
    test("Should assign a function to a variable", () => {
        const code = `set a = () => {};`;

        const ast = buildAST(code);

        expect(ast.length).toBe(1);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const varContext = varNode.context as Context["VariableDeclaration"];

        expect(varContext).toBeDefined();
        expect(varContext.value?.instruction).toBe("FunctionDeclaration");
    });

    test("Should call a function assigned to a variable", () => {
        const code = `set a = () => {};\na();`;

        const ast = buildAST(code);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const varContext = varNode.context as Context["VariableDeclaration"];

        expect(varContext).toBeDefined();
        expect(varContext.value?.instruction).toBe("FunctionDeclaration");

        const callNode = ast[1];

        expect(callNode.instruction).toBe("FunctionCall");
    });

    test("Should pass parameters to a function", () => {
        const code = `set a = (set b;) => {};\na(1);`;

        const ast = buildAST(code);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const varContext = varNode.context as Context["VariableDeclaration"];

        expect(varContext).toBeDefined();
        expect(varContext.value?.instruction).toBe("FunctionDeclaration");

        const callNode = ast[1];

        expect(callNode.instruction).toBe("FunctionCall");

        const callContext = callNode.context as Context["FunctionCall"];

        expect(Object.keys(callContext.args).length).toBe(1);
    });

    test("Should pass a variable parameter to a function", () => {
        const code = `set a = (set b;) => {};\nset c = 1;\na(c);`;

        const ast = buildAST(code);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const varContext = varNode.context as Context["VariableDeclaration"];

        expect(varContext).toBeDefined();
        expect(varContext.value?.instruction).toBe("FunctionDeclaration");

        const callNode = ast[2];

        expect(callNode.instruction).toBe("FunctionCall");

        const callContext = callNode.context as Context["FunctionCall"];

        expect(Object.keys(callContext.args).length).toBe(1);
    });
    
    test("Should allow recursion", () => {
        const code = `set a = () => { a(); };`;

        const ast = buildAST(code);

        const varNode = ast[0];

        expect(varNode.instruction).toBe("VariableDeclaration");

        const varContext = varNode.context as Context["VariableDeclaration"];

        expect(varContext).toBeDefined();
        expect(varContext.value?.instruction).toBe("FunctionDeclaration");

        const funcContext = (varContext.value as any)?.context as Context["FunctionDeclaration"];

        const callNode = funcContext.block.context.children[0];

        expect(callNode.instruction).toBe("FunctionCall");
    });
});
