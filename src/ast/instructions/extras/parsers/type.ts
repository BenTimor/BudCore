import { ReturnedInstructionNode } from "engine";
import { Instructions } from "../../../../types";
import { CompilerError, Context, InternalInstructionParser, isInstruction } from "../../../types";

export class TypeParser extends InternalInstructionParser {
    instruction: Instructions = "Type";
    check(): boolean {
        const next = this.next(["VariableRead"]);
        return this.arg === ":" && isInstruction(next, "VariableRead") && next.context.type.name === "type";
    }
    handle(): ReturnedInstructionNode<Instructions, Context["Type"]> | null {
        const next = this.next(["VariableRead"]);

        if (!isInstruction(next, "VariableRead") || next.context.type.name !== "type") {
            throw new CompilerError("Couldn't read variable in type parser");
        }

        return {
            instruction: "Type",
            context: {
                type: next.context.type,
            }
        }
    }
    
}