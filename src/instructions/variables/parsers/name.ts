import { reserved } from "../../../reserved";
import { InternalInstructionNode, InternalInstructionParser, VariablesInstructions } from "../../../types";

export class NameParser extends InternalInstructionParser {
    instruction: VariablesInstructions = "VariableName";
    limited = true;
    
    check(): boolean {
        return this.arg.match(/^[a-zA-Z_]/) !== null && !reserved.has(this.arg);
    }
    handle(): InternalInstructionNode {
        return {
            instruction: "VariableName",
            context: {
                name: this.arg,
            },
        };
    }
}