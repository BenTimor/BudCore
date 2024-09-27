import { Instructions } from "../../../../types";
import { Context, InternalInstructionNode, InternalInstructionParser, isInstruction, ReturnedInternalInstructionNode } from "../../../types";

export class ElseParser extends InternalInstructionParser {
    instruction: Instructions = "Else";

    check() {
        return this.arg === "else";
    }

    handle(): ReturnedInternalInstructionNode<Context["Else"]> {
        let block = this.next(["Block", "If"]);

        if (isInstruction(block, "If")) {
            const returnWithIf: InternalInstructionNode<Context["Return"]> = {
                instruction: "Return",
                context: {
                    value: block,
                    identifier: "DEFAULT", // TODO DRY
                    type: block.context.type,
                },
                endsAt: block.endsAt,
            }

            const blockWithIf: InternalInstructionNode<Context["Block"]> = {  // TODO We'll need DRY here when we have loops. Maybe somehow "Blockify" things
                instruction: "Block",
                context: {
                    children: [returnWithIf],
                    type: block.context.type,
                    identifier: "DEFAULT", // TODO DRY
                },
                endsAt: block.endsAt,

            }

            block = blockWithIf;
        }

        if (!isInstruction(block, "Block")) {
            throw new Error("Expected block"); // TODO Proper error
        }

        return {
            instruction: "Else",
            context: {
                block,
                type: block.context.type,
            }
        }
    }
}