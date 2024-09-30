import { Instructions } from "../../../../types";
import { Memory } from "../../../memory";
import { Context, InternalInstructionParser, isTyped, ReturnedInternalInstructionNode } from "../../../types";
import { typesEqual } from "../../../utils";

export class ArrayEndParser extends InternalInstructionParser {
    limited: boolean = true;
    instruction: Instructions = "ArrayEnd";

    check(): boolean {
        return this.arg === "]";
    }

    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: "ArrayEnd",
        };
    }
}

export class ArrayParser extends InternalInstructionParser<Context["Array"]> {
    instruction: Instructions = "Array";

    check(): boolean {
        return this.arg === "[";
    }

    handle(): ReturnedInternalInstructionNode<Context["Array"]> {
        this.injection = {
            ...this.injection,
            memory: this.injection.memory.scope(),
        }

        const children = this.nextChildren(undefined, ["ArrayEnd"]).filter(child => child.instruction !== "Semicolon");

        children.pop(); // Remove the last element, which is the closing parenthesis

        if (children.length === 0) {
            return {
                instruction: "Array",
                context: {
                    type: {
                        name: "array",
                        elementType: {
                            name: "any",
                        },
                    },
                    children: [],
                },
            }
        }

        return {
            instruction: "Array",
            context: {
                type: {
                    name: "array",
                    elementType: children.reduce((prev, curr) => isTyped(curr) && typesEqual(prev, curr.context.type) ? curr.context.type : {
                        name: "any",
                    }, isTyped(children[0]) ? children[0].context.type : {
                        name: "void",
                    }),
                },
                children,
            },
        }
    }

}