import { Instructions } from "../../../../types";
import { Context, InternalInstructionNode, InternalInstructionParser, isTyped, ReturnedInternalInstructionNode } from "../../../types";
import { BooleanType } from "../../../types/types";
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
            const literalTrue: InternalInstructionNode<Context["Literal"]> = { 
                instruction: "Literal",
                endsAt: -1,
                context: {
                    value: "true",
                    type: new BooleanType(),
                },
            };

            return {
                instruction: "Not",
                context: {
                    value: literalTrue,
                    type: new BooleanType(),
                },
            }
        }

        return {
            instruction: "Not",
            context: {
                value: node as any, // TODO We know it's a boolean, but let's see how to not use any
                type: new BooleanType(),
            },
        };
    }
}