import { ReturnedInstructionNode } from "engine";
import { Instructions, InternalInstructionNode, InternalInstructionParser } from "../../../types";

export class ParenthesesEndParser extends InternalInstructionParser {
    limited: boolean = true;
    instruction: Instructions = "ParenthesesEnd";

    check(): boolean {
        return this.arg === ")";
    }
    
    handle(): ReturnedInstructionNode<InternalInstructionNode> {
        return {
            instruction: "ParenthesesEnd",
            context: {
                type: "void",
            },
        };
    }
}

export class ParenthesesParser extends InternalInstructionParser {
    instruction: Instructions = "Parentheses";

    check(): boolean {
        return this.arg === "(";
    }
    
    handle(): ReturnedInstructionNode<InternalInstructionNode> {
        const children = this.nextChildren(undefined, ["ParenthesesEnd"]);

        children.pop(); // Remove the last element, which is the closing parenthesis

        if (children.length !== 1) {
            throw new Error("Parentheses must contain exactly one element");
        }

        return {
            instruction: "Parentheses",
            context: {
                type: children[0].context.type,
                value: children[0],
            },
        };
    }

}