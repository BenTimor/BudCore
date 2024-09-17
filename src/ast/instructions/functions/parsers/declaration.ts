import { Instructions } from "../../../../types";
import { Context, InternalInstructionNode, InternalInstructionParser, isInstruction, ReturnedInternalInstructionNode } from "../../../types";
import { FunctionParameterType } from "../../../types/types";
import { ExpectedArrayParameter, ExpectedBlockAfterFunctionDeclaration, ExpectedObjectAndArrayParameter, ExpectedObjectParameter, ExpectedVariableDeclaration, MissingParametersDeclaration } from "../errors";

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
            throw new MissingParametersDeclaration();
        }

        const defaults: Record<string, InternalInstructionNode<any>> = {};
        const parameters: FunctionParameterType[] = [];

        for (const child of parametersNode.context.children) {
            if (!isInstruction(child, "VariableDeclaration")) {
                throw new ExpectedVariableDeclaration();
            }

            parameters.push({
                name: child.context.name,
                type: child.context.variableType,
                mutable: child.context.mutable,
                optional: !!child.context.value,
            });

            if (child.context.value) {
                defaults[child.context.name] = child.context.value;
            }
        }

        const spread = spreadMap[this.arg as Arrow];

        if (spread === "AllSpread") {
            const objParam = parameters.at(-1);
            const arrParam = parameters.at(-2);

            if (!objParam || objParam.type.name !== "object" || !arrParam || arrParam.type.name !== "array") { // TODO Validate inner object/array types
                throw new ExpectedObjectAndArrayParameter();
            }
        }
        else if (spread === "ArraySpread") {
            const arrParam = parameters.at(-1);

            if (!arrParam || arrParam.type.name !== "array") {
                throw new ExpectedArrayParameter();
            }
        }
        else if (spread === "ObjectSpread") {
            const objParam = parameters.at(-1);

            if (!objParam || objParam.type.name !== "object") {
                throw new ExpectedObjectParameter();
            }
        }

        this.injection = {
            ...this.injection,
            memory: this.injection.memory.scope(),
        };

        

        const block = this.next(["Block"]);

        if (!isInstruction(block, "Block")) {
            throw new ExpectedBlockAfterFunctionDeclaration();
        }

        return {
            instruction: "FunctionDeclaration",
            context: {
                type: {
                    name: "function",
                    parameters,
                    spread,
                    returnType: { name: "void" }, // TODO Implement types
                },
                block,
                defaults,
            }
        };
    }
}