import { nanoid } from "nanoid";
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

    handle(): ReturnedInternalInstructionNode<Context["FunctionDeclaration"]> | null {
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

        const memoryScope = this.injection.memory.scope();

        const paramVariableList: InternalInstructionNode<Context["VariableDeclaration"]>[] = parameters.map(param => {
            // TODO This is duplicate code from VariableDeclarationParser
            let identifier: `VAR_DECLARATION_${string}` = `VAR_DECLARATION_${nanoid()}`;

            // Ensure the identifier is unique
            while (this.astBuilder.getNode(identifier)) {
                identifier = `VAR_DECLARATION_${nanoid()}`;
            }

            const literalValue: InternalInstructionNode<Context["Literal"]> = {
                instruction: "Literal",
                endsAt: -1,
                context: {
                    value: param.name,
                    type: param.type,
                }
            };

            memoryScope.set(`VAR_${param.name}`, identifier, true);

            return {
                instruction: "VariableDeclaration",
                endsAt: -1,
                context: {
                    name: param.name,
                    mutable: param.mutable,
                    variableType: param.type,
                    value: literalValue,
                },
                identifier,
            }
        });
        
        this.injection = {
            ...this.injection,
            memory: memoryScope,
            blockPrefixElements: [
                ...this.injection.blockPrefixElements,
                ...paramVariableList,
            ]
        };

        const functionNode: InternalInstructionNode<Context["FunctionDeclaration"]> = {
            instruction: "FunctionDeclaration",
            context: {
                type: {
                    name: "function",
                    parameters,
                    spread,
                    returnType: { name: "void" }, // TODO Implement types
                },
                defaults,
                block: {} as any, // TODO Rethink what should be here
            },
            endsAt: this.nextIndex,
        };

        this.astBuilder.addNode(functionNode);

        const block = this.next(["Block"]);

        if (!isInstruction(block, "Block")) {
            throw new ExpectedBlockAfterFunctionDeclaration();
        }

        functionNode.context.block = block;
        functionNode.endsAt = this.nextIndex;

        return null;
    }
}