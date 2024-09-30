import { ReturnedInstructionNode } from "engine";
import { Instructions } from "../../../../types";
import { CompilerError, Context, InternalInstructionParser, isInstruction } from "../../../types";

export class ExportParser extends InternalInstructionParser {
    instruction: Instructions = "Export";

    check(): boolean {
        return this.arg === "export";
    }

    handle(): ReturnedInstructionNode<Instructions, Context["Export"]> {
        const varRead = this.next(["VariableRead"]);

        if (!isInstruction(varRead, "VariableRead")) {
            throw new Error("Expected VariableRead"); // TODO Error handling
        }

        const varDeclaration = this.astBuilder.getNode(varRead.context.identifier);

        if (!isInstruction(varDeclaration, "VariableDeclaration")) {
            throw new CompilerError("Expected VariableDeclaration");
        }

        return {
            instruction: "Export",
            context: {
                name: varDeclaration.context.name,
                value: varRead,
            }
        }
    }
    
}