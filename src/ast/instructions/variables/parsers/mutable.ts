import { VariablesInstructions } from "../../../../types";
import { InternalInstructionParser, ReturnedInternalInstructionNode } from "../../../types";

export class MutableParser extends InternalInstructionParser {
    instruction: VariablesInstructions = "VariableMutable";
    limited = true;
    
    check(): boolean {        
        return this.arg === "mut";
    }
    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: "VariableMutable"
        };
    }
}