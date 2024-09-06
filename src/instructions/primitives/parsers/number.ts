import { InternalInstructionNode, InternalInstructionParser } from "../../../types";

export class NumberParser extends InternalInstructionParser {
    instruction: "Number" = "Number";
    
    check(): boolean {
        return isNaN(+this.arg) === false;
    }

    handle(): InternalInstructionNode {
        return {
            instruction: "Number",
            context: {
                value: +this.arg,
            },
        };
    }
}