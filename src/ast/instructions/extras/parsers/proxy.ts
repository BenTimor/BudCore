import { Instructions } from "../../../../types";
import { InternalInstructionParser, ReturnedInternalInstructionNode } from "../../../types";

export class ProxyParser extends InternalInstructionParser {
    instruction: Instructions = "Proxy";

    check(): boolean {
        return this.arg === "proxy";
    }

    handle(): ReturnedInternalInstructionNode {
        const reference = this.next(["VariableRead"]);

        if (!reference) {
            throw new Error("Proxy must have a reference");
        }
        
        const block = this.next(["Block"]);

        if (!block) {
            throw new Error("Proxy must have a block");
        }

        return {
            instruction: this.instruction,
            context: {
                reference,
                block,
                type: "void",
            }
        }
    }

}