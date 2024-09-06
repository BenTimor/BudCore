import { InternalInstructionNode, InternalInstructionParser, VariablesInstructions } from "../../../types";

export class ReadParser extends InternalInstructionParser {
    instruction: VariablesInstructions = "VariableRead";

    check(): boolean {
        return !!this.injection.memory.get(`VAR_${this.arg}`, false);
    }

    handle(): InternalInstructionNode {
        return {
            instruction: "VariableRead",
            context: {
                identifier: this.arg,
            },
        };
    }
}