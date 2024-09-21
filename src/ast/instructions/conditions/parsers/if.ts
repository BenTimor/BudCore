import { Instructions } from "../../../../types";
import { Context, InternalInstructionParser, isInstruction, isTyped, ReturnedInternalInstructionNode } from "../../../types";

export class IfParser extends InternalInstructionParser {
    instruction: Instructions = "If";
    
    check(): boolean {
        return this.arg === "if"; 
    }
    handle(): ReturnedInternalInstructionNode<Context["If"]> {
        const condition = this.next();

        if (!isTyped(condition) || condition.context.type.name !== "boolean") {
            throw new Error("If condition must be a boolean"); // TODO Proper errors
        }

        const block = this.next();

        if (!isInstruction(block, "Block")) {
            throw new Error("If block must be a block"); // TODO Proper errors
        }

        return {
            instruction: "If",
            context: {
                condition: condition as any, // TODO Think of a better way to handle this
                block
            }
        }
    }
}