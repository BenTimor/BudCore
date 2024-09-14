import { Instructions } from "../../../../types";
import { Context, InternalInstructionParser, isInstruction, ReturnedInternalInstructionNode } from "../../../types";
import { MissingProxyBlock, MissingProxyReference } from "../errors";

export class ProxyParser extends InternalInstructionParser<Context["Proxy"]> {
    instruction: Instructions = "Proxy";

    check(): boolean {
        return this.arg === "proxy";
    }

    handle(): ReturnedInternalInstructionNode<Context["Proxy"]> {
        const variable = this.next(["VariableRead"]);

        if (!isInstruction(variable, "VariableRead")) {
            throw new MissingProxyReference();
        }
        
        const block = this.next(["Block"]);

        if (!block) {
            throw new MissingProxyBlock();
        }

        return {
            instruction: this.instruction,
            context: {
                identifier: variable.context.identifier,
                block,
            }
        }
    }

}