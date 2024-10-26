import { CompilerError, Context, InternalInstructionNode, InternalInstructionVisitor, isInstruction, isTyped } from "../../../types";

export class IndexingVisitor extends InternalInstructionVisitor {
    check(): boolean {
        const indexing = this.astBuilder.nodes.at(-1);
        const obj = this.astBuilder.nodes.at(-2);

        return isTyped(obj) && isInstruction(indexing, "Array");
    }
    handle(): void {
        const indexing = this.astBuilder.nodes.pop();
        const obj = this.astBuilder.nodes.pop();

        if (!isInstruction(indexing, "Array") || !isTyped(obj)) {
            throw new CompilerError("Invalid array indexing handling");
        }

        if (indexing.context.children.length !== 1) { // TODO: Support multiple indexing
            throw new Error("Invalid array indexing handling");
        }

        const index = indexing.context.children[0];

        if (!isTyped(index)) {
            throw new Error("Invalid array indexing handling"); // TODO Proper error
        }

        const featureType = obj.context.type.featureByType(index.context.type);

        if (!featureType) {
            throw new Error("Invalid array indexing handling"); // TODO Proper error
        }

        const node: InternalInstructionNode<Context["Indexing"]> = {
            instruction: "Indexing",
            context: {
                type: featureType,
                obj: obj as any,
                index: index as any, // TODO Solve those type issues
            },
            endsAt: index.endsAt,
        }

        this.astBuilder.addNode(node);
    }
    
}