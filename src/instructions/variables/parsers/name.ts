import { Reserved } from "../../../reserved";
import { ReturnedInternalInstructionNode, InternalInstructionParser, VariablesInstructions } from "../../../types";

export class NameParser extends InternalInstructionParser {
    instruction: VariablesInstructions = "VariableName";
    limited = true;
    
    check(): boolean {
        return this.arg.match(/^[a-zA-Z_]/) !== null && !Reserved.words.has(this.arg);
    }
    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: "VariableName",
            context: {
                name: this.arg,
                type: "void",
            },
        };
    }
}