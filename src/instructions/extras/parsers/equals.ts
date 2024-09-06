import { InternalInstructionNode, InternalInstructionParser } from "../../../types";
import { ExtrasInstructions } from "../../../types/instructions/extras";

export class EqualsParser extends InternalInstructionParser {
    instruction: ExtrasInstructions = "Equals";

    check(): boolean {
        return this.arg === "=";
    }

    handle(): InternalInstructionNode {
        return {
            instruction: "Equals",
        };
    }
}