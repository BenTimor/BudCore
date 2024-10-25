import { Instructions } from "../../../../types";
import { CompilerError, Context, InternalInstructionNode, InternalInstructionParser, isInstruction, isTyped, ReturnedInternalInstructionNode } from "../../../types";
import { ConditionMustBeBoolean, ExpectedBlockAfterIf, MismatchIfElseType } from "../errors";

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

        if (elseNode && !isInstruction(elseNode, "Else")) {
            throw new CompilerError("Expected else node");
        }

        const elseContext = elseNode ? elseNode.context as Context["Else"] : undefined;

        if (elseContext && block.context.type.assignableTo(elseContext.type)) {
            throw new MismatchIfElseType();
        }

        return {
            instruction: "If",
            context: {
                condition: condition as any, // TODO Think of a better way to handle this
                block,
                else: elseContext?.block,
                type: block.context.type,
            }
        }
    }
}