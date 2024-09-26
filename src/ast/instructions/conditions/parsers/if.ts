import { Instructions } from "../../../../types";
import { Context, InternalInstructionNode, InternalInstructionParser, isInstruction, isTyped, ReturnedInternalInstructionNode } from "../../../types";
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

        let elseNode = this.next(["Else"]);
        let elseBlock;

        if (isInstruction(elseNode, "Else")) {
            elseBlock = this.next();

            if (isInstruction(elseBlock, "If")) { // TODO We'll need DRY here when we have loops. Maybe somehow "Blockify" things
                const blockWithIf: InternalInstructionNode<Context["Block"]> = {
                    instruction: "Block",
                    context: {
                        children: [elseBlock],
                        type: {
                            name: "void" // TODO Fix if types
                        },
                        identifier: "DEFAULT", // TODO DRY
                    },
                    endsAt: elseBlock.endsAt,

                }

                elseBlock = blockWithIf;
            }

            if (!isInstruction(elseBlock, "Block")) {
                throw new ExpectedBlockAfterIf(); // TODO Change to expected block after else
            }
        }

        return {
            instruction: "If",
            context: {
                condition: condition as any, // TODO Think of a better way to handle this
                block,
                else: elseBlock
            }
        }
    }
}