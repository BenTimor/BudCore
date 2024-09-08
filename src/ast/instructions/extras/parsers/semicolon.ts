import { ReturnedInternalInstructionNode, InternalInstructionParser } from "../../../types";
import { ExtrasInstructions } from "../../../types/instructions/extras";

export class SemicolonParser extends InternalInstructionParser {
    instruction: ExtrasInstructions = "Semicolon";

    check(): boolean {
        return this.arg === ";";
    }

    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: "Semicolon",
            context: {
                type: "void",
            }
        };
    }
}