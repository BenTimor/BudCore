import { Instructions } from "../../../../types";
import { CompilerError, Context, InternalInstructionNode, InternalInstructionParser, isInstruction, isTyped, ReturnedInternalInstructionNode } from "../../../types";
import { NumberType, StringType } from "../../../types/types";

export class IndexingParser extends InternalInstructionParser {
    instruction: Instructions = "Indexing";

    check(): boolean {
        return this.arg === ".";
    }

    handle(): ReturnedInternalInstructionNode<Context["Indexing"]> {
        const lastNode = this.astBuilder.nodes.pop();

        if (!isTyped(lastNode)) {
            throw new Error("Unexpected node type"); // TODO: Proper error
        }

        const next = this.next(["VariableName", "Number"]);

        if (next === undefined) {
            throw new Error("Unexpected end of input"); // TODO: Proper error
        }

        let index: string;

        if (isInstruction(next, "Number")) {
            index = `${next.context.value}`;
        }
        else if (isInstruction(next, "VariableName")) {
            index = next.context.name;
        }
        else {
            throw new CompilerError("Unexpected next node in indexing parser");
        }

        // TODO We need to have a awy to know for sure that a feature doesn't exist
        const type = lastNode.context.type.featureByName(index) || lastNode.context.type.featureByType(isInstruction(next, "Number") ? new NumberType() : new StringType());

        if (!type) {
            throw new Error("Feature not found"); // TODO: Proper error
        }

        const indexNode: InternalInstructionNode<Context["String"]> = {
            instruction: "String",
            context: {
                value: index,
                type: new StringType(),
            },
            endsAt: -1,
        };

        return {
            instruction: "Indexing",
            context: {
                type,
                index: indexNode,
                obj: lastNode,
            }
        }
    }

}