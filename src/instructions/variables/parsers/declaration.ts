import { InternalVariablesNode, InternalVariablesParser, VariablesInstructions } from "../../../types";

export class DeclarationParser extends InternalVariablesParser {
    instruction: VariablesInstructions = "VariableDeclaration";
    
    check(): boolean {
        return this.arg === "set";
    }
    handle(): InternalVariablesNode {
        this.limitNext = ["VariableName"];

        const name = this.next();

        if (name?.value !== "VariableName") {
            throw new Error("Invalid variable name");
        }

        this.clearLimitNext();

        const value = this.next();

        if (!value) {
            throw new Error("Invalid variable value");
        }

        return {
            value: "VariableDeclaration",
            context: {
                name: name.context!.identifier,
                value: value,
            },
        };
    }
}