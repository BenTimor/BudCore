import { Instructions } from "../../../../types";
import { Memory } from "../../../memory";
import { Context, InternalInstructionParser, isTyped, ReturnedInternalInstructionNode } from "../../../types";

export class ParenthesesEndParser extends InternalInstructionParser {
    limited: boolean = true;
    instruction: Instructions = "ParenthesesEnd";

    check(): boolean {
        return this.arg === ")";
    }

    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: "ParenthesesEnd",
        };
    }
}

export class ParenthesesParser extends InternalInstructionParser<Context["Parentheses"]> {
    instruction: Instructions = "Parentheses";

    check(): boolean {
        return this.arg === "(";
    }

    handle(): ReturnedInternalInstructionNode<Context["Parentheses"]> {
        this.injection = {
            ...this.injection,
            memory: new Memory(this.injection.memory),
        }
        
        const children = this.nextChildren(undefined, ["ParenthesesEnd"]);

        children.pop(); // Remove the last element, which is the closing parenthesis

        if (children.length === 0) {
            throw new Error("Parentheses must contain at least one element");
        }

        if (children.length > 1) {
            return {
                instruction: "Parentheses",
                context: {
                    type: "tuple", // TODO Not sure if this is the best type
                    children,
                },
            }
        }

        const child = children[0];

        if (!isTyped(child)) {
            throw new Error("Parentheses must contain an element of a known type");
        }

        return {
            instruction: "Parentheses",
            context: {
                type: child.context.type,
                children,
            },
        };
    }

}