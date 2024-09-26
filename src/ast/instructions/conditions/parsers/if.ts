import { Instructions } from "../../../../types";
import { Context, InternalInstructionParser, isInstruction, isTyped, ReturnedInternalInstructionNode } from "../../../types";
import { ConditionMustBeBoolean, ExpectedBlockAfterIf } from "../errors";

export class IfParser extends InternalInstructionParser {
    instruction: Instructions = "If";
    
    check(): boolean {
        return this.arg === "if"; 
    }
    handle(): ReturnedInternalInstructionNode<Context["If"]> {
        const condition = this.next();

        if (!isTyped(condition) || condition.context.type.name !== "boolean") {            
            throw new ConditionMustBeBoolean(); 
        }

        const block = this.next();        

        if (!isInstruction(block, "Block")) {       
            throw new ExpectedBlockAfterIf();
        }

        return {
            instruction: "If",
            context: {
                condition: condition as any, // TODO Think of a better way to handle this
                block
            }
        }
    }
}