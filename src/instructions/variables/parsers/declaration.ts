import { InternalInstructionNode, InternalInstructionParser, VariablesInstructions } from "../../../types";

export class DeclarationParser extends InternalInstructionParser {
    instruction: VariablesInstructions = "VariableDeclaration";
    
    check(): boolean {
        return this.arg === "set";
    }
    
    handle(): InternalInstructionNode {
        this.limitNext = ["VariableName", "VariableMutable"];

        const next = this.next();

        let mutable: boolean = false;
        let name: typeof next;

        if (next?.instruction === "VariableMutable") {            
            this.limitNext = ["VariableName"];
            mutable = true;
            name = this.next();
        }
        else {
            name = next;
        }

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
                mutable,
                value: value,
            },
        };
    }
}