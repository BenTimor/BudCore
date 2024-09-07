import { ReturnedInternalInstructionNode, InternalInstructionParser, VariablesInstructions } from "../../../types";

export class ReadParser extends InternalInstructionParser {
    instruction: VariablesInstructions = "VariableRead";

    check(): boolean {
        return !!this.injection.memory.get(`VAR_${this.arg}`, false);
    }

    handle(): ReturnedInternalInstructionNode {
        const varIdentifier = this.injection.memory.get(`VAR_${this.arg}`, false);

        const varNode = this.astBuilder.getNode(varIdentifier);

        return {
            instruction: "VariableRead",
            context: {
                identifier: this.arg,
                type: varNode!.context.type,
            },
        };
    }
}