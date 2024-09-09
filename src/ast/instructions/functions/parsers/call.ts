import { Instructions } from "../../../../types";
import { Context, InternalInstructionNode, InternalInstructionParser, isInstruction, isTyped, ReturnedInternalInstructionNode } from "../../../types";
import { nativeFunctions } from "../../../native/functions";

export class FunctionCallParser extends InternalInstructionParser<Context["FunctionCall"]> {
    instruction: Instructions = "FunctionCall";

    check(): boolean {
        const lastNode = this.astBuilder.nodes[this.astBuilder.nodes.length - 1];

        return this.arg === "(" && isInstruction(lastNode, "VariableRead") && lastNode.context.type === "function";
    }

    handle(): ReturnedInternalInstructionNode<Context["FunctionCall"]> {
        let children = this.nextChildren(undefined, ["ParenthesesEnd"]);

        children.pop(); // Remove the last element, which is the closing parenthesis

        children = children.filter(child => child.instruction !== "Semicolon");

        const functionReference = this.astBuilder.nodes.pop();

        if (!isInstruction(functionReference, "VariableRead")) {
            throw new Error("Function reference is missing while handling function call");
        }

        const nativeFunction = nativeFunctions[functionReference.context.identifier]; // TODO Take function data from functionReference

        if (!nativeFunction) {
            throw new Error(`Function ${functionReference.context.identifier} is not defined`);
        }

        let allowAnonymousArgs = true;
        let args: Record<string, InternalInstructionNode | InternalInstructionNode[]> = {};

        const spreadArg = nativeFunction.args.find(arg => arg.spread);

        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            if (!isTyped(child)) {
                throw new Error("Invalid argument type");
            }

            if (isInstruction(child, "VariableDeclaration")) {
                allowAnonymousArgs = false;

                const arg = nativeFunction.args.find(arg => arg.name === child.context.name);

                if (!arg) {
                    throw new Error(`Argument ${child.context.name} is not defined in function ${functionReference.context.identifier}`);
                }

                if (arg.type !== "any" && arg.type !== child.context.type) {
                    throw new Error(`Argument ${child.context.name} of type ${child.context.type} mismatch in function ${functionReference.context.identifier}`);
                }

                args[child.context.name] = child.context.value;
            }
            else {
                if (!allowAnonymousArgs) {
                    throw new Error("Anonymous arguments are not allowed in this context");
                }

                const arg = nativeFunction.args[i];
                const argName = arg?.name;

                if (!argName) {
                    if (!spreadArg) {
                        throw new Error("Too many arguments");
                    }

                    if (spreadArg.type !== "any" && spreadArg.type !== child.context.type) {
                        throw new Error(`Argument of type ${child.context.type} mismatch in function ${functionReference.context.identifier}`);
                    }

                    if (!args[spreadArg.name]) {
                        args[spreadArg.name] = [];
                    }

                    (args[spreadArg.name] as any).push(child); // TODO Fix spread arg type
                    continue;
                }

                if (arg.type !== "any" && arg.type !== child.context.type) {
                    throw new Error(`Argument type ${child.context.type} mismatch in function ${functionReference.context.identifier}`);
                }

                if (arg.spread) {
                    if (!args[argName]) {
                        args[argName] = [];
                    }

                    (args[argName] as any).push(child); // TODO Fix spread arg type
                    continue;
                }

                args[argName] = child;
            }
        }

        return {
            instruction: "FunctionCall",
            context: {
                identifier: functionReference.context.identifier,
                args,
                type: nativeFunction.returnType,
            },
        }
    }
}