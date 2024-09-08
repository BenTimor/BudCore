import { VariablesInstructions } from "../../../../types";
import { InternalInstructionParser, ReturnedInternalInstructionNode } from "../../../types";

export class AssignmentParser extends InternalInstructionParser {
    instruction: VariablesInstructions = "VariableAssignment";

    check(): boolean {
        return this.next(["Equals"])?.instruction === "Equals";
    }

    handle(): ReturnedInternalInstructionNode {
        const variableName = this.arg;

        const varIdentifier = this.injection.memory.get(`VAR_${variableName}`, false);

        if (!varIdentifier) {
            throw new Error(`Variable ${variableName} not found`);
        }

        const varNode = this.astBuilder.getNode(varIdentifier);        

        if (!varNode?.context?.mutable) {
            throw new Error(`Variable ${variableName} is not mutable`);
        }

        this.next(["Equals"]); // Skip the equals sign

        const values = this.nextChildren(undefined, ["Semicolon"]);        

        if (!values || values.length != 2) {
            throw new Error("Invalid variable value");
        }

        const value = values[0];

        return {
            instruction: "VariableAssignment",
            context: {
                name: variableName,
                identifier: varIdentifier,
                type: value.context.type,
                value: value,
            },
        };
    }
}