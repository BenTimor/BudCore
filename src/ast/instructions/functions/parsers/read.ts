import { ReturnedInstructionNode } from "engine";
import { Instructions, InternalInstructionNode, InternalInstructionParser } from "../../../types";
import { nativeFunctions } from "../../../native";

export class FunctionReadParser extends InternalInstructionParser {
    instruction: Instructions = "FunctionRead";

    check(): boolean {
        return nativeFunctions[this.arg] !== undefined;
    }

    handle(): ReturnedInstructionNode<InternalInstructionNode> {
        const nativeFunction = nativeFunctions[this.arg];

        return {
            instruction: "FunctionRead",
            context: {
                type: "function",
                name: this.arg,
                identifier: nativeFunction.identifier,
                args: nativeFunction.args,
                returnType: nativeFunction.returnType,
            },
        }
    }
    
}