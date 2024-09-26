import { Instructions } from "../../../../types";
import { Context, InternalInstructionNode, InternalInstructionParser, isTyped, ReturnedInternalInstructionNode } from "../../../types";
import { InvalidNotValue } from "../errors";

export class NotParser extends InternalInstructionParser {
    instruction: Instructions = "Not";

    check(): boolean {
        return this.arg === "!";
    }

    handle(): ReturnedInternalInstructionNode<Context["Not"]> {
        const node = this.next();

        if (!node || !isTyped(node)) {
            throw new InvalidNotValue();
        }

        if (node.context.type.name !== "boolean") {
            const literalTrue: InternalInstructionNode<Context["Literal"] & { type: { name: "boolean" } }> = { // TODO We got it in few places, let's try to make it DRY
                instruction: "Literal",
                endsAt: -1,
                context: {
                    value: "true",
                    type: {
                        name: "boolean",
                    },
                },
            };

            return {
                instruction: "Not",
                context: {
                    value: literalTrue,
                    type: {
                        name: "boolean",
                    }
                },
            }
        }

        return {
            instruction: "Not",
            context: {
                value: node as any, // TODO We know it's a boolean, but let's see how to not use any
                type: {
                    name: "boolean",
                },
            },
        };
    }
}