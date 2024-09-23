import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class ReturnGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Return";
    }

    async handle(node: InternalInstructionNode<Context["Return"]>): Promise<string> {
        const value = await this.generator.generateOne(node.context.value);
        return `bud.return(${JSON.stringify(node.context.identifier)}, ${value})`;
    }
}