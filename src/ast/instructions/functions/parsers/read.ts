import { nativeFunctions } from "../../../native";
import { Instructions } from "../../../../types";
import { InternalInstructionParser, ReturnedInternalInstructionNode } from "../../../types";

export class FunctionReadParser extends InternalInstructionParser {
    instruction: Instructions = "FunctionRead";

    check(): boolean {
        return nativeFunctions[this.arg] !== undefined;
    }

    handle(): ReturnedInternalInstructionNode {
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