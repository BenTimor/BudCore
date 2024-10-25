import { CompilerError, Context, InternalInstructionNode, InternalInstructionVisitor, isInstruction, isTyped } from "../../../types";
import { ArrayType, NumberType } from "../../../types/types";

export class ArrayIndexingVisitor extends InternalInstructionVisitor {
    check(): boolean {
        const indexing = this.astBuilder.nodes.at(-1);
        const array = this.astBuilder.nodes.at(-2);

        return isTyped(array) && array.context.type.name === "array" && isInstruction(indexing, "Array"); // TODO Fix type checking to use internal utils
    }
    handle(): void {
        const indexing = this.astBuilder.nodes.pop();
        const array = this.astBuilder.nodes.pop();

        if (!isInstruction(indexing, "Array") || !(isTyped(array) && array.context.type.name === "array")) {
            throw new CompilerError("Invalid array indexing handling");
        }

        if (indexing.context.children.length !== 1) { // TODO: Support multiple indexing
            throw new Error("Invalid array indexing handling");
        }

        const index = indexing.context.children[0];

        if (!isTyped(index) || !index.context.type.assignableTo(new NumberType())) {
            throw new Error("Invalid array indexing handling"); // TODO Proper error
        }

        const node: InternalInstructionNode<Context["ArrayIndexing"]> = {
            instruction: "ArrayIndexing",
            context: {
                type: (array.context.type as ArrayType).elementType,
                array: array as any,
                index: index as any, // TODO Solve those type issues
            },
            endsAt: index.endsAt,
        }

        this.astBuilder.addNode(node);
    }
}