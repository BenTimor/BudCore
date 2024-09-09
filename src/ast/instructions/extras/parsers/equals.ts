import { ReturnedInternalInstructionNode, InternalInstructionParser } from "../../../types";
import { ExtrasInstructions } from "../../../../types/instructions/extras";

export class EqualsParser extends InternalInstructionParser {
    instruction: ExtrasInstructions = "Equals";
    limited: boolean = true;

    check(): boolean {
        return this.arg === "=";
    }

    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: "Equals"
        };
    }
}