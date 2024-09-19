import { CompilerError, InternalInstructionVisitor, isInstruction } from "../../../types";

export class ProcessingTypeVisitor extends InternalInstructionVisitor {
    check(): boolean {
        const currNode = this.astBuilder.nodes.at(-1);
        const lastNode = this.astBuilder.nodes.at(-2);
        const parentLastNode = this.astBuilder.parent?.nodes.at(-1);

        return currNode?.instruction === "FunctionDeclaration" && lastNode === undefined && parentLastNode?.instruction === "VariableDeclaration";
    }

    handle(): void {
        const currNode = this.astBuilder.nodes.at(-1);
        const parentLastNode = this.astBuilder.parent?.nodes.at(-1);

        if (!isInstruction(currNode, "FunctionDeclaration") || !isInstruction(parentLastNode, "VariableDeclaration")) {
            throw new CompilerError("There was an error parsing the function declaration. Could not find the function declaration or variable declaration while handling the function declaration");
        }

        parentLastNode.context.type = currNode.context.type;
    }
}