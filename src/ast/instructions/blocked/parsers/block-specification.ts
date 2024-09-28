import { Instructions } from "../../../../types";
import { Context, InternalInstructionParser, isInstruction, ReturnedInternalInstructionNode } from "../../../types";
import { InvalidBlockIdentifier } from "../errors";

export class BlockSpecificationParser extends InternalInstructionParser {
    instruction: Instructions = "BlockSpecification";
    limited: boolean = true;

    check(): boolean {
        return this.arg === "->";
    }

    handle(): ReturnedInternalInstructionNode<Context["BlockSpecification"]> {
        const identifier = this.next(["VariableName"]);

        if (!isInstruction(identifier, "VariableName")) {
            throw new InvalidBlockIdentifier();
        }

        return {
            instruction: "BlockSpecification",
            context: {
                identifier: identifier.context.name,
            }
        };
    }
}