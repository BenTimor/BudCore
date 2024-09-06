import { InternalInstructionNode, InternalInstructionParser, VariablesInstructions } from "../../../types";

export class AssignmentParser extends InternalInstructionParser {
    instruction: VariablesInstructions = "VariableAssignment";

    check(): boolean {
        this.limitNext = ["Equals"];
        return this.next()?.instruction === "Equals";
    }

    handle(): InternalInstructionNode {
        const variableName = this.arg;

        const varIdentifier = this.injection.memory.get(`VAR_${variableName}`, false);

        if (!varIdentifier) {
            throw new Error(`Variable ${variableName} not found`);
        }

        const varNode = this.astBuilder.getNode(varIdentifier);        

        if (!varNode?.context?.mutable) {
            throw new Error(`Variable ${variableName} is not mutable`);
        }

        this.limitNext = ["Equals"];

        this.next(); // Skip the equals sign

        this.clearLimitNext();

        const value = this.next();

        if (!value) {
            throw new Error("Syntax error");
        }

        return {
            instruction: "VariableAssignment",
            context: {
                name: variableName,
                value: value.context!.value,
            },
        };
    }
}