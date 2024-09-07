import { nanoid } from "nanoid";
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
        let nameNode: typeof next;

        if (next?.instruction === "VariableMutable") {            
            this.limitNext = ["VariableName"];
            mutable = true;
            nameNode = this.next();
        }
        else {
            nameNode = next;
        }

        if (nameNode?.instruction !== "VariableName") {
            throw new Error("Invalid variable name");
        }

        const name = nameNode.context!.name;
        
        const exists = this.injection.memory.get(`VAR_${name}`, true);

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

        let identifier: `VAR_DECLARATION_${string}` = `VAR_DECLARATION_${nanoid()}`;

        // Ensure the identifier is unique
        while (this.astBuilder.getNode(identifier)) {
            identifier = `VAR_DECLARATION_${nanoid()}`;
        }

        this.injection.memory.set(`VAR_${name}`, identifier, true); // TODO: We'll have scope issues here, we need to rethink this

        return {
            instruction: "VariableDeclaration",
            identifier: identifier,
            context: {
                name: name,
                mutable,
                value: value,
            },
        };
    }
}