import { nanoid } from "nanoid";
import { VariablesInstructions } from "../../../../types";
import { Context, InternalInstructionNode, InternalInstructionParser, isInstruction, isTyped, ReturnedInternalInstructionNode } from "../../../types";
import { MissingEqualsSign, MissingVariableName, MissingVariableValue, MultipleValuesInVariable, VariableAlreadyExists } from "../errors";

export class VariableDeclarationParser extends InternalInstructionParser<Context["VariableDeclaration"]> {
    instruction: VariablesInstructions = "VariableDeclaration";

    check(): boolean {
        return this.arg === "set";
    }

    handle(): ReturnedInternalInstructionNode<Context["VariableDeclaration"]> | null {
        let next = this.next(["VariableName", "VariableMutable"]);

        let mutable: boolean = false;
        let nameNode: typeof next;

        if (!next) {
            throw new MissingVariableName();
        }

        if (next.instruction === "VariableMutable") {
            mutable = true;
            nameNode = this.next(["VariableName"]);
        }
        else {
            nameNode = next;
        }

        if (!isInstruction(nameNode, "VariableName")) {
            throw new MissingVariableName();
        }

        const name = nameNode.context.name;

        const exists = this.injection.memory.get(`VAR_${name}`, true);

        if (exists) {
            throw new VariableAlreadyExists();
        }

        const equalsOrSemicolon = this.next(["Equals", "Semicolon"]);

        let identifier: `VAR_DECLARATION_${string}` = `VAR_DECLARATION_${nanoid()}`;

        // Ensure the identifier is unique
        while (this.astBuilder.getNode(identifier)) {
            identifier = `VAR_DECLARATION_${nanoid()}`;
        }

        if (isInstruction(equalsOrSemicolon, "Semicolon")) {
            this.injection.memory.set(`VAR_${name}`, identifier, true);

            return {
                instruction: "VariableDeclaration",
                identifier,
                context: {
                    name: name,
                    mutable,
                    variableType: {
                        name: "void",
                    },
                },
            };
        }

        if (!isInstruction(equalsOrSemicolon, "Equals")) {
            throw new MissingEqualsSign();
        }

        const varDeclarationNode: InternalInstructionNode<Context["VariableDeclaration"]> = {
            instruction: "VariableDeclaration",
            identifier: identifier,
            context: {
                name: name,
                mutable,
                variableType: {
                    name: "any",
                },
            },
            endsAt: this.nextIndex,
        };

        this.injection.memory.set(`VAR_${name}`, identifier, true);

        this.astBuilder.addNode(varDeclarationNode);

        const values = this.nextChildren(undefined, ["Semicolon"]);

        if (values.length === 1) {
            throw new MissingVariableValue();
        }

        if (values.length > 2) {
            throw new MultipleValuesInVariable();
        }

        const value = values[0];

        varDeclarationNode.context.variableType = isTyped(value) ? value.context.type : {
            name: "void",
        };
        varDeclarationNode.context.value = value;
        varDeclarationNode.endsAt = value.endsAt;

        return null;
    }
}