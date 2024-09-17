import { Instructions } from "../../../../types";
import { Context, InternalInstructionParser, ReturnedInternalInstructionNode } from "../../../types";
import { MissingBlockEnd } from "../errors";

export class BlockEndParser extends InternalInstructionParser {
    instruction: Instructions = "BlockEnd";
    limited: boolean = true;

    check(): boolean {
        return this.arg === "}";
    }

    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: this.instruction
        }
    }
}

export class BlockParser extends InternalInstructionParser<Context["Block"]> {
    instruction: Instructions = "Block";

    check(): boolean {
        return this.arg === "{";
    }

    handle(): ReturnedInternalInstructionNode<Context["Block"]> {
        const children = this.nextChildren(undefined, ["BlockEnd"], {
            missingStopError: () => new MissingBlockEnd(),
            childrenPrefix: this.injection.blockPrefixElements,
        });

        children.pop(); // Remove the BlockEnd

        return {
            instruction: this.instruction,
            context: {
                children
            }
        }
    }
}