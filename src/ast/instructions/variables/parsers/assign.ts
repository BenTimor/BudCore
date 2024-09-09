import { VariablesInstructions } from "../../../../types";
import { Context, InternalInstructionParser, isInstruction, isTyped, ReturnedInternalInstructionNode } from "../../../types";

export class AssignmentParser extends InternalInstructionParser<Context["VariableAssignment"]> {
    instruction: VariablesInstructions = "VariableAssignment";

    check(): boolean {
        return this.next(["Equals"])?.instruction === "Equals";
    }

    handle(): ReturnedInternalInstructionNode<Context["VariableAssignment"]> {
        const variableName = this.arg;

        const varIdentifier = this.injection.memory.get(`VAR_${variableName}`, false);

        if (!varIdentifier) {
            throw new Error(`Variable ${variableName} not found`);
        }

        const varNode = this.astBuilder.getNode(varIdentifier);        

        if (!isInstruction(varNode, "VariableDeclaration")) {
            throw new Error(`Variable ${variableName} is not declared`);
        }

        if (!varNode?.context?.mutable) {
            throw new Error(`Variable ${variableName} is not mutable`);
        }

        this.next(["Equals"]); // Skip the equals sign

        const values = this.nextChildren(undefined, ["Semicolon"]);        

        if (!values || values.length != 2) {
            throw new Error("Invalid variable value");
        }

        const value = values[0];

        if (!isTyped(value)) {
            throw new Error("Invalid value type");
        }

        return {
            instruction: "VariableAssignment",
            context: {
                identifier: varIdentifier,
                type: value.context.type,
                value: value,
            },
        };
    }
}