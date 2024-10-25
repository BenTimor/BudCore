import { Instructions } from "../../../../types";
import { Context, InternalInstructionParser, isInstruction, ReturnedInternalInstructionNode } from "../../../types";
import { AnyType, Type } from "../../../types/types";
import { InvalidIdentifier, MissingBlockAfterIdentifier, MissingBlockEnd } from "../errors";

export class BlockStartParser extends InternalInstructionParser {
    instruction: Instructions = "BlockStart";
    limited: boolean = true;

    check(): boolean {
        return this.arg === "{";
    }

    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: this.instruction
        }
    }
}

export class BlockEndParser extends InternalInstructionParser {
    instruction: Instructions = "BlockEnd";
    limited: boolean = true;

    check(): boolean {
        return this.arg === "}";
    }

    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: this.instruction
        }
    }
}

export class BlockParser extends InternalInstructionParser<Context["Block"]> {
    instruction: Instructions = "Block";

    check(): boolean {
        return this.arg === "{" || this.arg === "_";
    }

    handle(): ReturnedInternalInstructionNode<Context["Block"]> {
        let identifier = "DEFAULT";

        if (this.arg === "_") {
            const varName = this.next(["VariableName"]);

            if (!isInstruction(varName, "VariableName")) {
                throw new InvalidIdentifier();
            }

            identifier = varName.context.name;

            if (!isInstruction(this.next(["BlockStart"]), "BlockStart")) {
                throw new MissingBlockAfterIdentifier();
            }
        }

        this.injection = {
            ...this.injection,
            currentBlockIdentifier: identifier,
            memory: this.injection.memory.scope(),
        }

        const children = this.nextChildren(undefined, ["BlockEnd"], {
            missingStopError: () => new MissingBlockEnd(),
            childrenPrefix: this.injection.blockPrefixElements,
        });

        children.pop(); // Remove the BlockEnd

        let type: Type<string> = new AnyType();

        try {
            const typeNode = this.next(["Type"]);

            if (isInstruction(typeNode, "Type")) {
                type = typeNode.context.type;
            }
        }
        catch (e) {}

        return {
            instruction: this.instruction,
            context: {
                identifier,
                children,
                type,
            }
        }
    }
}