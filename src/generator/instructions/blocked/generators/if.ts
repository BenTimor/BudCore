import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class IfGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode): Promise<boolean> {
        return node.instruction === "If";
    }

    async handle(node: InternalInstructionNode<Context["If"]>): Promise<string> {
        const condition = await this.generator.generateOne(node.context.condition);
        const block = await this.generator.generateOne(node.context.block);
        let generatedElse = "{ }";

        if (node.context.else) {
            generatedElse = (await this.generator.generateOne(node.context.else)) || generatedElse;
        }

        return `bud.if(${condition}, () => ${block}, () => ${generatedElse})`;
    }
    
}