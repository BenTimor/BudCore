import { Instructions } from "../../../../types";
import { InternalInstructionParser, ReturnedInternalInstructionNode } from "../../../types";

export class ElseParser extends InternalInstructionParser {
    instruction: Instructions = "Else";

    check() {
        return this.arg === "else";
    }

    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: "Else",
        }
    }
}