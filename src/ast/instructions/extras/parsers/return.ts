import { Instructions } from "../../../../types";
import { Context, InternalInstructionParser, isInstruction, isTyped, ReturnedInternalInstructionNode } from "../../../types";

export class ReturnIdentifierParser extends InternalInstructionParser {
    instruction: Instructions = "ReturnIdentifier";
    limited: boolean = true;

    check(): boolean {
        return this.arg === "->";
    }

    handle(): ReturnedInternalInstructionNode<Context["ReturnIdentifier"]> {
        const identifier = this.next(["VariableName"]);

        if (!isInstruction(identifier, "VariableName")) {
            throw new Error("Expected VariableName"); // TODO Proper error
        }

        return {
            instruction: "ReturnIdentifier",
            context: {
                identifier: identifier.context.name,
            }
        };
    }
}

export class ReturnParser extends InternalInstructionParser {
    instruction: Instructions = "Return";

    check(): boolean {
        return this.arg === "return";
    }

    handle(): ReturnedInternalInstructionNode<Context["Return"]> {
        const children = this.nextChildren(undefined, ["Semicolon", "ReturnIdentifier"]);

        const last = children.pop(); 

        if (children.length !== 1) {
            throw new Error("Return statement must have exactly one child"); // TODO proper error
        }

        let identifier = this.injection.currentBlockIdentifier;

        if (isInstruction(last, "ReturnIdentifier")) {
            identifier = last.context.identifier;
        }

        const value = children[0];

        if (!isTyped(value)) {
            throw new Error("Return value must have a type"); // TODO proper error
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