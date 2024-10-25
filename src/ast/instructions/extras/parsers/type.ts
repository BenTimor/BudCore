import { ReturnedInstructionNode } from "engine";
import { Instructions } from "../../../../types";
import { CompilerError, Context, InternalInstructionNode, InternalInstructionParser, isInstruction } from "../../../types";
import { TypeType, VoidType } from "../../../types/types";

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

        const declarationNode = this.astBuilder.getNode(next.context.identifier) as InternalInstructionNode<Context["VariableDeclaration"]>;        

        return {
            instruction: "Type",
            context: {
                type: new TypeType(),
                value: (declarationNode.context.value as any).context.value,
            }
        }
    }
    
}