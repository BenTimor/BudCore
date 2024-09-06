import { InternalInstructionNode, InternalInstructionParser } from "../../../types";
import { ExtrasInstructions } from "../../../types/instructions/extras";

export class SemicolonParser extends InternalInstructionParser {
    instruction: ExtrasInstructions = "Semicolon";

    check(): boolean {
        return this.arg === ";";
    }

    handle(): InternalInstructionNode {
        return {
            instruction: "Semicolon",
        };
    }
}