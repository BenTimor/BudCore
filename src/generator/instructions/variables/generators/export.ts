import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class ExportGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "Export";
    }

    async handle(node: InternalInstructionNode<Context["Export"]>): Promise<string | null> {
        const value = await this.generator.generateOne(node.context.value);

        return `bud.export("${node.context.name}", ${value})`;
    }
    
}