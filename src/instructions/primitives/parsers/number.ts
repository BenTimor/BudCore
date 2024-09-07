import { ReturnedInternalInstructionNode, InternalInstructionParser } from "../../../types";

export class NumberParser extends InternalInstructionParser {
    instruction: "Number" = "Number";
    
    check(): boolean {
        return isNaN(+this.arg) === false;
    }

    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: "Number",
            context: {
                value: +this.arg,
                type: "number",
            },
        };
    }
}