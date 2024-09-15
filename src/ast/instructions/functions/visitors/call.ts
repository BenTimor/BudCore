import { CompilerError, Context, InternalInstructionNode, InternalInstructionVisitor, isInstruction } from "../../../types";
import { InvalidFunctionParameter, MissingFunctionParameterValue } from "../errors";

export class FunctionCallVisitor extends InternalInstructionVisitor {
    check(): boolean {
        return isInstruction(this.astBuilder.nodes.at(-1), "Parentheses") && isInstruction(this.astBuilder.nodes.at(-2), "VariableRead");
    }
    handle(): void {
        const parentheses = this.astBuilder.nodes.pop();
        const variableRead = this.astBuilder.nodes.pop();

        if (!isInstruction(variableRead, "VariableRead") || !isInstruction(parentheses, "Parentheses")) {
            throw new CompilerError("There was an error parsing the function call. Could not find the variable read or parentheses while handling the function call");
        }

        let args: Record<string, InternalInstructionNode<any> | InternalInstructionNode<any>[]> = {};

        for (const child of parentheses.context.children) {
            if (!isInstruction(child, "VariableDeclaration")) {
                throw new InvalidFunctionParameter();
            }

            if (!child.context.value) {
                throw new MissingFunctionParameterValue();
            }

            args[child.context.name] = child.context.value;
        }

        const functionCallNode: InternalInstructionNode<Context["FunctionCall"]> = {
            instruction: "FunctionCall",
            endsAt: parentheses.endsAt,
            context: {
                args,
                identifier: variableRead.context.identifier,
                type: {
                    name: "void",
                }, // TODO Fix types
            }
        };

        this.astBuilder.nodes.push(functionCallNode);
    }
}