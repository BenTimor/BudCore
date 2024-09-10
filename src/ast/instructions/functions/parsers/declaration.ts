import { Instructions } from "../../../../types";
import { Context, InternalInstructionNode, InternalInstructionParser, isInstruction, ReturnedInternalInstructionNode } from "../../../types";
import { FunctionParameter } from "../../../types/functions";

type Arrow = "=>" | "=>>" | "=:>" | "=:>>";

const spreadMap: Record<Arrow, "NoSpread" | "ArraySpread" | "ObjectSpread" | "AllSpread"> = {
    "=>": "NoSpread",
    "=>>": "ArraySpread",
    "=:>": "ObjectSpread",
    "=:>>": "AllSpread",
}

export class FunctionDeclarationParser extends InternalInstructionParser<Context["FunctionDeclaration"]> {
    instruction: Instructions = "FunctionDeclaration";

    check(): boolean {
        return this.arg === "=>" || this.arg === "=>>" || this.arg === "=:>" || this.arg === "=:>>";
    }

    handle(): ReturnedInternalInstructionNode<Context["FunctionDeclaration"]> {
        const parametersNode = this.astBuilder.nodes.pop();

        if (!isInstruction(parametersNode, "Parentheses")) {
            throw new Error("Expected parentheses before arrow function");
        }

        const parameters: FunctionParameter<InternalInstructionNode<any>>[] = [];

        for (const child of parametersNode.context.children) {
            if (!isInstruction(child, "VariableDeclaration")) {
                throw new Error("Expected variable declaration in function parameters");
            }

            parameters.push({
                name: child.context.name,
                type: child.context.variableType,
                mutable: child.context.mutable,
                default: child.context.value,
            });
        }

        const spread = spreadMap[this.arg as Arrow];

        if (spread === "AllSpread") {
            const objParam = parameters.at(-1);
            const arrParam = parameters.at(-2);

            if (!objParam || objParam.type !== "object") {
                throw new Error("Expected object parameter when using all spread");
            }

            if (!arrParam || arrParam.type !== "array") {
                throw new Error("Expected array parameter when using all spread");
            }
        }
        else if (spread === "ArraySpread") {
            const arrParam = parameters.at(-1);

            if (!arrParam || arrParam.type !== "array") {
                throw new Error("Expected array parameter when using array spread");
            }
        }
        else if (spread === "ObjectSpread") {
            const objParam = parameters.at(-1);

            if (!objParam || objParam.type !== "object") {
                throw new Error("Expected object parameter when using object spread");
            }
        }

        const block = this.next(["Block"]);

        if (!isInstruction(block, "Block")) {
            throw new Error("Expected block after function declaration");
        }

        return {
            instruction: "FunctionDeclaration",
            context: {
                parameters,
                type: "void", // TODO Implement types
                spread,
                block,
            }
        };
    }
}