import { Instructions } from "../../../../types";
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
        const children = this.nextChildren(undefined, ["ParenthesesEnd"]);

        children.pop(); // Remove the last element, which is the closing parenthesis

        if (children.length !== 1) {
            throw new Error("Parentheses must contain exactly one element");
        }

        const child = children[0];

        if (!isTyped(child)) {
            throw new Error("Parentheses must contain an element of a known type");
        }

        return {
            instruction: "Parentheses",
            context: {
                type: child.context.type,
                value: children[0],
            },
        };
    }

}