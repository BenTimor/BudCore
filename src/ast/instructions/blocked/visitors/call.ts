import { CompilerError, Context, InternalInstructionNode, InternalInstructionVisitor, isInstruction, isTyped } from "../../../types";
import { InvalidFunctionParameter, MissingFunctionParameterValue } from "../errors";

export class FunctionCallVisitor extends InternalInstructionVisitor {
    check(): boolean {
        const functionNode = this.astBuilder.nodes.at(-2);
        return isInstruction(this.astBuilder.nodes.at(-1), "Parentheses") && isTyped(functionNode) && functionNode.context.type.name === "function";
    }
    handle(): void {
        const parenthesesNode = this.astBuilder.nodes.pop();
        const functionNode = this.astBuilder.nodes.pop();

        if (!isInstruction(parenthesesNode, "Parentheses") || !isTyped(functionNode) || functionNode.context.type.name !== "function") {
            throw new CompilerError("There was an error parsing the function call. Could not find the variable read or parentheses while handling the function call");
        }

        let args: Record<string, InternalInstructionNode<any> | InternalInstructionNode<any>[]> = {};

        let hasNamedArg = false;

        const parenthesesChildren = parenthesesNode.context.children.filter(child => child.instruction !== "Semicolon");

        for (let childIndex = 0; childIndex < parenthesesChildren.length; childIndex++) {
            const child = parenthesesChildren[childIndex];

            if (isInstruction(child, "VariableDeclaration")) {                
                hasNamedArg = true;

                if (!child.context.value) {
                    throw new MissingFunctionParameterValue();
                }

                if (functionNode.context.type.parameters.find(param => param.name === child.context.name)) {
                    args[child.context.name] = child.context.value;
                    continue;
                }

                if (functionNode.context.type.spread === "AllSpread" || functionNode.context.type.spread === "ObjectSpread") {
                    const objParam = functionNode.context.type.parameters.at(-1);

                    if (!objParam) {
                        throw new InvalidFunctionParameter();
                    }

                    const objParamName = objParam.name;

                    if (!args[objParamName]) {
                        const argDeclaration: InternalInstructionNode<Context["VariableDeclaration"]> = {
                            instruction: "VariableDeclaration",
                            endsAt: -1,
                            context: {
                                name: objParamName,
                                value: {} as any, // TODO Add object node and integrate it
                                mutable: objParam.mutable,
                                type: objParam.type,
                            }
                        };

                        args[objParamName] = argDeclaration;
                    }

                    throw new CompilerError("Not implemented yet");
                }

                throw new InvalidFunctionParameter();
            }
            else {
                const lengthOffset = functionNode.context.type.spread === "AllSpread" ? 2 : (functionNode.context.type.spread === "ArraySpread" ? 1 : 0);

                if (hasNamedArg || childIndex >= functionNode.context.type.parameters.length - lengthOffset) {
                    let arrParam;

                    if (functionNode.context.type.spread === "AllSpread") {
                        arrParam = functionNode.context.type.parameters.at(-2);
                    }
                    else if (functionNode.context.type.spread === "ArraySpread") {
                        arrParam = functionNode.context.type.parameters.at(-1);
                    }
                    else {
                        throw new InvalidFunctionParameter();
                    }

                    if (!arrParam) {
                        throw new InvalidFunctionParameter();
                    }

                    const arrParamName = arrParam.name;

                    if (!args[arrParamName]) {
                        const arrayDeclaration: InternalInstructionNode<Context["Array"]> = {
                            instruction: "Array",
                            endsAt: -1,
                            context: {
                                children: [],
                                type: {
                                    name: "array",
                                    elementType: (arrParam.type as any /* TODO Rethink how to handle those types, maybe add validation */).elementType,
                                }
                            }
                        };

                        args[arrParamName] = arrayDeclaration;
                    }

                    if (!isInstruction(args[arrParamName], "Array")) {
                        throw new CompilerError("The array parameter is not an array");
                    }

                    args[arrParamName].context.children.push(child);
                }
                else {
                    args[functionNode.context.type.parameters[childIndex].name] = child; // TODO Type validations
                }
            }
        }

        const functionCallNode: InternalInstructionNode<Context["FunctionCall"]> = {
            instruction: "FunctionCall",
            endsAt: parenthesesNode.endsAt,
            context: {
                args,
                function: functionNode,
                type: functionNode.context.type.returnType,
            }
        };

        this.astBuilder.nodes.push(functionCallNode);
    }
}