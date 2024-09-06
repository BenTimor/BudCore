import { InternalInstructionNode, InternalInstructionParser, VariablesInstructions } from "../../../types";

export class DeclarationParser extends InternalInstructionParser {
    instruction: VariablesInstructions = "VariableDeclaration";
    
    check(): boolean {
        return this.arg === "set";
    }
    
    handle(): InternalInstructionNode {
        this.limitNext = ["VariableName"];

        const name = this.next();

        if (name?.instruction !== "VariableName") {
            throw new Error("Invalid variable name");
        }

        const identifier = name.context!.name;
        
        const exists = this.injection.memory.get(`VAR_${identifier}`, true);

        if (exists) {
            throw new Error("Variable already exists");
        }

        this.limitNext = ["Equals"];

        if (this.next()?.instruction !== "Equals") {
            throw new Error("Invalid variable declaration");
        }

        this.clearLimitNext();

        const value = this.next();

        if (!value) {
            throw new Error("Invalid variable value");
        }

        this.injection.memory.set(`VAR_${identifier}`, true, true);

        return {
            instruction: "VariableDeclaration",
            context: {
                name: identifier,
                value: value,
            },
        };
    }
}