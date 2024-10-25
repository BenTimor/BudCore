import { Instructions } from "../../../../types";
import { Memory } from "../../../memory";
import { Context, InternalInstructionParser, isTyped, ReturnedInternalInstructionNode } from "../../../types";
import { TupleType, VoidType } from "../../../types/types";

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
            return {
                instruction: "Parentheses",
                context: {
                    type: new VoidType(),
                    children: [],
                },
            }
        }

        if (children.length > 1) {
            return {
                instruction: "Parentheses",
                context: {
                    type: new TupleType(children.map((child) => {
                        return isTyped(child) ? child.context.type : new VoidType();
                    }
                    )),
                    children,
                },
            }
        }

        const child = children[0];

        return {
            instruction: "Parentheses",
            context: {
                type: isTyped(child) ? child.context.type : new VoidType(),
                children,
            },
        };
    }

}