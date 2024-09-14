import { CompilerError, InternalInstructionNode, isInstruction } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

const functions: Record<string, string> = {
    log: "console.log",
}

export class NativeFunctionGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "NativeFunction";
    }
    
    async handle(node: InternalInstructionNode): Promise<string> {
        if (!isInstruction(node, "NativeFunction")) {
            throw new CompilerError("Invalid native function node");
        }

        return functions[node.context.name] as string;    
    }
}