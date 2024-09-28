import { Instructions } from "../../../../types";
import { Context, InternalInstructionParser, isInstruction, ReturnedInternalInstructionNode } from "../../../types";

export class ContinueParser extends InternalInstructionParser {
    instruction: Instructions = "Continue";

    check(): boolean {
        return this.arg === "continue";
    }

    handle(): ReturnedInternalInstructionNode<Context["Continue"]> {
        const specification = this.next(["BlockSpecification"]);

        let identifier = this.injection.currentBlockIdentifier;

        if (isInstruction(specification, "BlockSpecification")) {
            identifier = specification.context.identifier;
        }

        return {
            instruction: this.instruction,
            context: {
                identifier,
            }
        }
    }
}