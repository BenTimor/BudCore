import { ReturnedInternalInstructionNode, InternalInstructionParser, Context } from "../../../types";

export class NumberParser extends InternalInstructionParser<Context["Number"]> {
    instruction: "Number" = "Number";
    
    check(): boolean {
        return isNaN(+this.arg) === false;
    }

    handle(): ReturnedInternalInstructionNode<Context["Number"]> {
        return {
            instruction: "Number",
            context: {
                value: +this.arg,
                type: "number",
            },
        };
    }
}