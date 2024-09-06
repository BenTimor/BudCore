import { InternalInstructionNode, InternalInstructionParser, VariablesInstructions } from "../../../types";

export class MutableParser extends InternalInstructionParser {
    instruction: VariablesInstructions = "VariableMutable";
    limited = true;
    
    check(): boolean {        
        return this.arg === "mut";
    }
    handle(): InternalInstructionNode {
        return {
            instruction: "VariableMutable",
        };
    }
}