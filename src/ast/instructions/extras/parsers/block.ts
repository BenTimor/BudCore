import { Instructions } from "../../../../types";
import { InternalInstructionParser, ReturnedInternalInstructionNode } from "../../../types";

export class BlockEndParser extends InternalInstructionParser {
    instruction: Instructions = "BlockEnd";

    check(): boolean {
        return this.arg === "}";
    }

    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: this.instruction,
            context: {
                type: "void",
            }
        }
    }
}

export class BlockParser extends InternalInstructionParser {
    instruction: Instructions = "Block";

    check(): boolean {
        return this.arg === "{";
    }

    handle(): ReturnedInternalInstructionNode {
        const children = this.nextChildren(undefined, ["BlockEnd"]);

        children.pop(); // Remove the BlockEnd

        return {
            instruction: this.instruction,
            context: {
                children,
                type: "void",
            }
        }
    }
}