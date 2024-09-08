import { VariablesInstructions } from "../../../../types";
import { InternalInstructionParser, ReturnedInternalInstructionNode } from "../../../types";

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
                name: this.arg,
                identifier: varIdentifier,
                type: varNode!.context.type,
            },
        };
    }
}