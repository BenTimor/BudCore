import { nanoid } from "nanoid";
import { VariablesInstructions } from "../../../../types";
import { Context, InternalInstructionParser, isInstruction, isTyped, ReturnedInternalInstructionNode } from "../../../types";

export class DeclarationParser extends InternalInstructionParser<Context["VariableDeclaration"]> {
    instruction: VariablesInstructions = "VariableDeclaration";

    check(): boolean {
        return this.arg === "set";
    }

    handle(): ReturnedInternalInstructionNode<Context["VariableDeclaration"]> {
        let next = this.next(["VariableName", "VariableMutable"]);

        let mutable: boolean = false;
        let nameNode: typeof next;

        if (!next) {
            throw new Error("Invalid variable declaration");
        }

        if (next.instruction === "VariableMutable") {
            mutable = true;
            nameNode = this.next(["VariableName"]);
        }
        else {
            nameNode = next;
        }

        if (!isInstruction(nameNode, "VariableName")) {
            throw new Error("Invalid variable name");
        }

        const name = nameNode.context.name;

        const exists = this.injection.memory.get(`VAR_${name}`, true);

        if (exists) {
            throw new Error("Variable already exists");
        }

        const equalsOrSemicolon = this.next(["Equals", "Semicolon"]);

        let identifier: `VAR_DECLARATION_${string}` = `VAR_DECLARATION_${nanoid()}`;

        if (isInstruction(equalsOrSemicolon, "Semicolon")) {
            this.injection.memory.set(`VAR_${name}`, identifier, true);

            return {
                instruction: "VariableDeclaration",
                identifier: `VAR_DECLARATION_${nanoid()}`,
                context: {
                    name: name,
                    mutable,
                    variableType: "void",
                    identifier,
                },
            };
        }

        if (!isInstruction(equalsOrSemicolon, "Equals")) {
            throw new Error("Invalid variable declaration");
        }

        const values = this.nextChildren(undefined, ["Semicolon"]);

        if (!values || values.length != 2 || !isTyped(values[0])) {
            throw new Error("Invalid variable value");
        }

        const value = values[0];

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
                identifier,
                mutable,
                value: value,
                variableType: value.context.type,
            },
        };
    }
}