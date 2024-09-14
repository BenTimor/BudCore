import { VariablesInstructions } from "../../../../types";
import { CompilerError, Context, InternalInstructionParser, isInstruction, isTyped, ReturnedInternalInstructionNode } from "../../../types";
import { MissingEqualsSign, MissingVariableValue, MultipleValuesInVariable } from "../errors";
import { VariableIsImmutable, VariableNotFound } from "../errors/assign";

export class VariableAssignmentParser extends InternalInstructionParser<Context["VariableAssignment"]> {
    instruction: VariablesInstructions = "VariableAssignment";

    check(): boolean {
        return this.next(["Equals"])?.instruction === "Equals";
    }

    handle(): ReturnedInternalInstructionNode<Context["VariableAssignment"]> {
        const variableName = this.arg;

        const varIdentifier = this.injection.memory.get(`VAR_${variableName}`, false);

        if (!varIdentifier) {
            throw new VariableNotFound(variableName);
        }

        const varNode = this.astBuilder.getNode(varIdentifier);

        if (!isInstruction(varNode, "VariableDeclaration")) {
            throw new CompilerError(`Variable identifier ${varIdentifier} is found but it is not a variable declaration`);
        }

        if (!varNode?.context?.mutable) {
            throw new VariableIsImmutable(variableName);
        }

        if (!this.next(["Equals"])) {
            throw new MissingEqualsSign();
        }

        const values = this.nextChildren(undefined, ["Semicolon"]);

        if (values.length === 1) {
            throw new MissingVariableValue();
        }

        if (values.length > 2) {
            throw new MultipleValuesInVariable();
        }

        const value = values[0];

        // TODO Validate the value type

        return {
            instruction: "VariableAssignment",
            context: {
                identifier: varIdentifier,
                type: isTyped(value) ? value.context.type : "void",
                value: value,
            },
        };
    }
}