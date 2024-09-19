import { ReturnedInstructionNode } from "engine";
import { Instructions } from "../../../../types";
import { InternalInstructionParser } from "../../../types";

export class TypeParser extends InternalInstructionParser {
    instruction: Instructions = "Type";
    check(): boolean {
        throw new Error("Method not implemented.");
    }
    handle(): ReturnedInstructionNode<Instructions, undefined> | null {
        throw new Error("Method not implemented.");
    }
    
}