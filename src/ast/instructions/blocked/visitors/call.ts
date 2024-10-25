import { CompilerError, Context, InternalInstructionNode, InternalInstructionVisitor, isInstruction, isTyped } from "../../../types";
import { ArrayType, FunctionSpread, FunctionType } from "../../../types/types";
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

        const functionNodeType = functionNode.context.type as FunctionType;
        
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

                if (functionNodeType.parameters.find(param => param.paramName === child.context.name)) {
                    args[child.context.name] = child.context.value;
                    continue;
                }

                if (functionNodeType.spread === FunctionSpread.AllSpread || functionNodeType.spread === FunctionSpread.ObjectSpread) {
                    const objParam = functionNodeType.parameters.at(-1);

                    if (!objParam) {
                        throw new InvalidFunctionParameter();
                    }

                    const objParamName = objParam.paramName;

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
                const lengthOffset = functionNodeType.spread === FunctionSpread.AllSpread ? 2 : (functionNodeType.spread === FunctionSpread.ArraySpread ? 1 : 0);

                if (hasNamedArg || childIndex >= functionNodeType.parameters.length - lengthOffset) {
                    let arrParam;

                    if (functionNodeType.spread === FunctionSpread.AllSpread) {
                        arrParam = functionNodeType.parameters.at(-2);
                    }
                    else if (functionNodeType.spread === FunctionSpread.ArraySpread) {
                        arrParam = functionNodeType.parameters.at(-1);
                    }
                    else {
                        throw new InvalidFunctionParameter();
                    }

                    if (!arrParam) {
                        throw new InvalidFunctionParameter();
                    }

                    const arrParamName = arrParam.paramName;

                    if (!args[arrParamName]) {
                        const arrayDeclaration: InternalInstructionNode<Context["Array"]> = {
                            instruction: "Array",
                            endsAt: -1,
                            context: {
                                children: [],
                                type: new ArrayType(arrParam.type),
                            }
                        };

                        args[arrParamName] = arrayDeclaration;
                    }

                    if (!isInstruction(args[arrParamName], "Array")) {
                        throw new CompilerError("The array parameter is not an array");
                    }

                    (args[arrParamName] as any).context.children.push(child); // TODO Why do we need "as any" here?
                }
                else {
                    args[functionNodeType.parameters[childIndex].paramName] = child; // TODO Type validations
                }
            }
        }

        const functionCallNode: InternalInstructionNode<Context["FunctionCall"]> = {
            instruction: "FunctionCall",
            endsAt: parenthesesNode.endsAt,
            context: {
                args,
                function: functionNode,
                type: functionNodeType.returns,
            }
        };

        this.astBuilder.nodes.push(functionCallNode);
    }
}