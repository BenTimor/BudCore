import { VariablesInstructions } from "../../../../types";
import { CompilerError, Context, InternalInstructionParser, isInstruction, ReturnedInternalInstructionNode } from "../../../types";

export class VariableReadParser extends InternalInstructionParser<Context["VariableRead"]> {
    instruction: VariablesInstructions = "VariableRead";

    check(): boolean {
        return !!this.injection.memory.get(`VAR_${this.arg}`, false);
    }

    handle(): ReturnedInternalInstructionNode<Context["VariableRead"]> {
        const varIdentifier = this.injection.memory.get(`VAR_${this.arg}`, false);

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