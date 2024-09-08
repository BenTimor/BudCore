import { VariablesInstructions } from "../../../../types";
import { InternalInstructionParser, ReturnedInternalInstructionNode } from "../../../types";
import { Reserved } from "../../../reserved";

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