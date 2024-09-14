import { VariablesInstructions } from "../../../../types";
import { nativeFunctionsIdentifiers } from "../../../native/functions";
import { CompilerError, Context, InternalInstructionParser, isInstruction, ReturnedInternalInstructionNode } from "../../../types";

export class VariableReadParser extends InternalInstructionParser<Context["VariableRead"]> {
    instruction: VariablesInstructions = "VariableRead";

    check(): boolean {
        return !!this.injection.memory.get(`VAR_${this.arg}`, false) || nativeFunctionsIdentifiers[this.arg];
    }

    handle(): ReturnedInternalInstructionNode<Context["VariableRead"]> {
        const varIdentifier = this.injection.memory.get(`VAR_${this.arg}`, false);

        if (!varIdentifier) {
            const nativeIdentifier = nativeFunctionsIdentifiers[this.arg]; // TODO Validate if it is a function

            return {
                instruction: "VariableRead",
                context: {
                    identifier: nativeIdentifier,
                    type: "function",
                },
            }
        }

        const varNode = this.astBuilder.getNode(varIdentifier);

        if (!isInstruction(varNode, "VariableDeclaration")) {
            throw new CompilerError(`Variable identifier ${varIdentifier} is found but it is not a variable declaration`);
        }

        return {
            instruction: "VariableRead",
            context: {
                identifier: varIdentifier,
                type: varNode.context.variableType,
            },
        };
    }
}