import { describe, test, expect } from "vitest";
import { buildAST } from "../../../src/ast";
import { Context, InternalInstructionNode } from "../../../src/ast/types";

describe("AST Indexing", () => {
    test("Should index an array index using visitor", () => {
        const code = `set a = [1; 2; 3];\nset b = a[1];`;

        const ast = buildAST(code);

        const indexVarNode = ast.at(-1);

        expect(indexVarNode?.instruction).toBe("VariableDeclaration");
        
        const varNodeContext = indexVarNode?.context as Context["VariableDeclaration"];

        expect(varNodeContext?.value?.instruction).toBe("Indexing");

        const indexContext = (varNodeContext?.value as InternalInstructionNode<Context["Indexing"]>)?.context;

        expect(indexContext?.index?.instruction).toBe("Number");
    
        const numberContext = indexContext?.index.context as Context["Number"];

        expect(numberContext.value).toBe(1);
    });

    test("Should index an array index using parser", () => {
        const code = `set a = [1; 2; 3];\nset b = a.1;`;

        const ast = buildAST(code);

        const indexVarNode = ast.at(-1);

        expect(indexVarNode?.instruction).toBe("VariableDeclaration");
        
        const varNodeContext = indexVarNode?.context as Context["VariableDeclaration"];

        expect(varNodeContext?.value?.instruction).toBe("Indexing");

        const indexContext = (varNodeContext?.value as InternalInstructionNode<Context["Indexing"]>)?.context;

        expect(indexContext?.index?.instruction).toBe("String");
    
        const stringContext = indexContext?.index.context as Context["String"];

        expect(stringContext.value).toBe("1");
    })

    test("Should index an array feature using visitor", () => {
        const code = `set a = [1; 2; 3];\nset b = a["size"];`;

        const ast = buildAST(code);

        const indexVarNode = ast.at(-1);

        expect(indexVarNode?.instruction).toBe("VariableDeclaration");
        
        const varNodeContext = indexVarNode?.context as Context["VariableDeclaration"];

        expect(varNodeContext?.value?.instruction).toBe("Indexing");

        const indexContext = (varNodeContext?.value as InternalInstructionNode<Context["Indexing"]>)?.context;

        expect(indexContext?.index?.instruction).toBe("String");
    
        const stringContext = indexContext?.index.context as Context["String"];

        expect(stringContext.value).toBe("size");
    });

    test("Should index an array feature using parser", () => {
        const code = `set a = [1; 2; 3];\nset b = a.size;`;

        const ast = buildAST(code);

        const indexVarNode = ast.at(-1);

        expect(indexVarNode?.instruction).toBe("VariableDeclaration");
        
        const varNodeContext = indexVarNode?.context as Context["VariableDeclaration"];

        expect(varNodeContext?.value?.instruction).toBe("Indexing");

        const indexContext = (varNodeContext?.value as InternalInstructionNode<Context["Indexing"]>)?.context;

        expect(indexContext?.index?.instruction).toBe("String");
    
        const stringContext = indexContext?.index.context as Context["String"];

        expect(stringContext.value).toBe("size");
    });
});