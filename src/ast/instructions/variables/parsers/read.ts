import { VariablesInstructions } from "../../../../types";
import { nativeVariables } from "../../../native";
import { nativeFunctionsIdentifiers } from "../../../native/functions";
import { Context, InternalInstructionParser, isInstruction, ReturnedInternalInstructionNode } from "../../../types";

export class ReadParser extends InternalInstructionParser<Context["VariableRead"]> {
    instruction: VariablesInstructions = "VariableRead";

    check(): boolean {
        return !!this.injection.memory.get(`VAR_${this.arg}`, false) || nativeFunctionsIdentifiers[this.arg];
    }

    handle(): ReturnedInternalInstructionNode<Context["VariableRead"]> {
        const varIdentifier = this.injection.memory.get(`VAR_${this.arg}`, false);

        if (!varIdentifier) {
            const nativeIdentifier = nativeFunctionsIdentifiers[this.arg];

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
            throw new Error("Invalid variable read");
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