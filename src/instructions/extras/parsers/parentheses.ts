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

        return {
            instruction: "Parentheses",
            context: {
                type: children.length === 1 ? children[0].context.type : "void",
                children,
            },
        };
    }

}