import { ReturnedInternalInstructionNode, InternalInstructionParser, VariablesInstructions } from "../../../types";

export class MutableParser extends InternalInstructionParser {
    instruction: VariablesInstructions = "VariableMutable";
    limited = true;
    
    check(): boolean {        
        return this.arg === "mut";
    }
    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: "VariableMutable",
            context: {
                type: "void",
            }
        };
    }
}