import { Instructions } from "../../../../types";
import { CompilerError, Context, InternalInstructionNode, InternalInstructionParser, isInstruction, isTyped, ReturnedInternalInstructionNode } from "../../../types";
import { TooManyChildren } from "../errors";

export class ReturnParser extends InternalInstructionParser {
    instruction: Instructions = "Return";

    check(): boolean {
        return this.arg === "return";
    }

    handle(): ReturnedInternalInstructionNode<Context["Return"]> {
        const children = this.nextChildren(undefined, ["Semicolon", "BlockSpecification"]);

        const last = children.pop(); 

        if (children.length !== 1) {
            throw new TooManyChildren();
        }

        let identifier = this.injection.currentBlockIdentifier;

        if (isInstruction(last, "BlockSpecification")) {
            identifier = last.context.identifier;
        }

        let value = children[0];

        if (!isTyped(value)) {
            const literalUndefined: InternalInstructionNode<Context["Literal"] & { type: { name: "void" } }> = {
                instruction: "Literal",
                endsAt: -1,
                context: {
                    value: "undefined",
                    type: {
                        name: "void",
                    },
                },
            };

            value = literalUndefined;
        }

        if (!isTyped(value)) {
            throw new CompilerError("Return value is not typed"); // This is literally to satisfy TypeScript
        }

        return {
            instruction: this.instruction,
            context: {
                value,
                type: value.context.type,
                identifier,
            }
        }
    }
}