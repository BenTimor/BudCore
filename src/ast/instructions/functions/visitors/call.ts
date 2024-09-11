import { Context, InternalInstructionNode, InternalInstructionVisitor, isInstruction } from "../../../types";

export class FunctionCallVisitor extends InternalInstructionVisitor {
    check(): boolean {
        return isInstruction(this.astBuilder.nodes.at(-1), "Parentheses") && isInstruction(this.astBuilder.nodes.at(-2), "VariableRead");
    }
    handle(): void {
        const parentheses = this.astBuilder.nodes.pop();
        const variableRead = this.astBuilder.nodes.pop();

        if (!isInstruction(variableRead, "VariableRead") || !isInstruction(parentheses, "Parentheses")) {
            throw new Error("Invalid function call");
        }

        let args: Record<string, InternalInstructionNode<any> | InternalInstructionNode<any>[]> = {};

        for (const child of parentheses.context.children) {
            if (!isInstruction(child, "VariableDeclaration")) {
                throw new Error("Invalid function parameters");
            }

            if (!child.context.value) {
                throw new Error("Invalid function parameters value");
            }

            args[child.context.name] = child.context.value;
        }

        const functionCallNode: InternalInstructionNode<Context["FunctionCall"]> = {
            instruction: "FunctionCall",
            endsAt: parentheses.endsAt,
            context: {
                args,
                identifier: variableRead.context.identifier,
                type: "void", // TODO Fix types
            }
        };

        this.astBuilder.nodes.push(functionCallNode);
    }
}