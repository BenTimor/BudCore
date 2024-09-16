import { CompilerError, Context, InternalInstructionNode, InternalInstructionVisitor, isInstruction } from "../../../types";
import { InvalidFunctionParameter, MissingFunctionParameterValue } from "../errors";

export class FunctionCallVisitor extends InternalInstructionVisitor {
    check(): boolean {
        return isInstruction(this.astBuilder.nodes.at(-1), "Parentheses") && isInstruction(this.astBuilder.nodes.at(-2), "VariableRead");
    }
    handle(): void {
        const parentheses = this.astBuilder.nodes.pop();
        const variableRead = this.astBuilder.nodes.pop();

        if (!isInstruction(variableRead, "VariableRead") || !isInstruction(parentheses, "Parentheses")) {
            throw new CompilerError("There was an error parsing the function call. Could not find the variable read or parentheses while handling the function call");
        }

        const varDeclarationNode = this.astBuilder.getNode(variableRead.context.identifier) as InternalInstructionNode<Context["VariableDeclaration"]>; // TODO Validate type and allow all sort of types who return function
        const functionNode = varDeclarationNode.context.value as InternalInstructionNode<Context["FunctionDeclaration"]>;

        let args: Record<string, InternalInstructionNode<any> | InternalInstructionNode<any>[]> = {};

        let hasNamedArg = false;

        const parenthesesChildren = parentheses.context.children.filter(child => child.instruction !== "Semicolon");

        for (let childIndex = 0; childIndex < parenthesesChildren.length; childIndex++) {
            const child = parenthesesChildren[childIndex];

            if (isInstruction(child, "VariableDeclaration")) {
                hasNamedArg = true;

                if (!child.context.value) {
                    throw new MissingFunctionParameterValue();
                }

                if (functionNode.context.parameters.find(param => param.name === child.context.name)) {
                    args[child.context.name] = child.context.value;
                    continue;
                }

                if (functionNode.context.spread === "AllSpread" || functionNode.context.spread === "ObjectSpread") {
                    const objParam = functionNode.context.parameters.at(-1);

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
                                variableType: objParam.type,
                            }
                        };

                        args[objParamName] = argDeclaration;
                    }

                    throw new CompilerError("Not implemented yet");
                }

                throw new InvalidFunctionParameter();
            }
            else {
                if (hasNamedArg || childIndex >= functionNode.context.parameters.length) {
                    let arrParam;

                    if (functionNode.context.spread === "AllSpread") {
                        arrParam = functionNode.context.parameters.at(-2);
                    }
                    else if (functionNode.context.spread === "ArraySpread") {
                        arrParam = functionNode.context.parameters.at(-1);
                    }
                    else {
                        throw new InvalidFunctionParameter();
                    }

                    if (!arrParam) {
                        throw new InvalidFunctionParameter();
                    }

                    const arrParamName = arrParam.name;

                    if (!args[arrParamName]) {
                        const argDeclaration: InternalInstructionNode<Context["VariableDeclaration"]> = {
                            instruction: "VariableDeclaration",
                            endsAt: -1,
                            context: {
                                name: arrParamName,
                                value: [] as any, // TODO Add array node and integrate it
                                mutable: arrParam.mutable,
                                variableType: arrParam.type,
                            }
                        };

                        args[arrParamName] = argDeclaration;
                    }

                    throw new CompilerError("Not implemented yet");
                }

                args[functionNode.context.parameters[childIndex].name] = child; // TODO Type validations
            }
        }
        
        const functionCallNode: InternalInstructionNode<Context["FunctionCall"]> = {
            instruction: "FunctionCall",
            endsAt: parentheses.endsAt,
            context: {
                args,
                identifier: variableRead.context.identifier,
                type: {
                    name: "void",
                }, // TODO Fix types
            }
        };

        this.astBuilder.nodes.push(functionCallNode);
    }
}