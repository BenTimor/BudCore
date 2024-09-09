import { VariablesInstructions } from "../../../../types";
import { Context, InternalInstructionParser, ReturnedInternalInstructionNode } from "../../../types";
import { Reserved } from "../../../reserved";

export class VariableNameParser extends InternalInstructionParser<Context["VariableName"]> {
    instruction: VariablesInstructions = "VariableName";
    limited = true;
    
    check(): boolean {
        return this.arg.match(/^[a-zA-Z_]/) !== null && !Reserved.words.has(this.arg);
    }
    
    handle(): ReturnedInternalInstructionNode<Context["VariableName"]> {
        return {
            instruction: "VariableName",
            context: {
                name: this.arg,
            },
        };
    }
}