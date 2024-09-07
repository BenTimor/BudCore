import { nanoid } from "nanoid";
import { ReturnedInternalInstructionNode, InternalInstructionParser, VariablesInstructions } from "../../../types";

export class DeclarationParser extends InternalInstructionParser {
    instruction: VariablesInstructions = "VariableDeclaration";

    check(): boolean {
        return this.arg === "set";
    }

    handle(): ReturnedInternalInstructionNode {
        const next = this.next(["VariableName", "VariableMutable"]);

        let mutable: boolean = false;
        let nameNode: typeof next;

        if (next?.instruction === "VariableMutable") {
            mutable = true;
            nameNode = this.next(["VariableName"]);
        }
        else {
            nameNode = next;
        }

        if (nameNode?.instruction !== "VariableName") {
            throw new Error("Invalid variable name");
        }

        const name = nameNode.context.name;

        const exists = this.injection.memory.get(`VAR_${name}`, true);

        if (exists) {
            throw new Error("Variable already exists");
        }

        if (this.next(["Equals"])?.instruction !== "Equals") {
            throw new Error("Invalid variable declaration");
        }

        const values = this.nextChildren(undefined, ["Semicolon"]);        

        if (!values || values.length != 2) {
            throw new Error("Invalid variable value");
        }

        const value = values[0];

        let identifier: `VAR_DECLARATION_${string}` = `VAR_DECLARATION_${nanoid()}`;

        // Ensure the identifier is unique
        while (this.astBuilder.getNode(identifier)) {
            identifier = `VAR_DECLARATION_${nanoid()}`;
        }

        this.injection.memory.set(`VAR_${name}`, identifier, true);

        return {
            instruction: "VariableDeclaration",
            identifier: identifier,
            context: {
                name: name,
                mutable,
                value: value,
                type: value.context.type,
            },
        };
    }
}