import { Instructions } from "../../../../types";
import { Context, InternalInstructionParser, isTyped, ReturnedInternalInstructionNode } from "../../../types";
import { AnyType, ArrayType, VoidType } from "../../../types/types";

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
                    type: new ArrayType(new AnyType()),
                    children: [],
                },
            }
        }

        

        return {
            instruction: "Array",
            context: {
                type: new ArrayType(new AnyType()), // TODO : Infer the type
                children,
            },
        }
    }

}