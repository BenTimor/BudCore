import { Generator, InstructionGenerator } from "engine";
import { InternalInstructionNode } from "../../ast/types";

export abstract class InternalInstructionGenerator extends InstructionGenerator<InternalInstructionNode> {
    async generateInBlock(id: string, nodes: InternalInstructionNode[]): Promise<string> {
        return await (this.generator as any).generateInBlock(id, nodes); // TODO Fix any type
    }

    async generateInParentheses(nodes: InternalInstructionNode[]): Promise<string> {
        return await (this.generator as any).generateInParentheses(nodes); // TODO Fix any type
    }
}

export class InternalGenerator extends Generator {
    async generateInBlock(id: string, nodes: InternalInstructionNode[]): Promise<string> {
        const generated = (await this.generateMany(nodes)).map(g => `(() => ${g})`);
    
        return `bud.block(${JSON.stringify(id)}, bud => [${generated.join(", ")}])`;
    }

    async generateInParentheses(nodes: InternalInstructionNode[]): Promise<string> {
        const generated = (await this.generateMany(nodes)).map(g => `(() => ${g})`);

        return `bud.parentheses(bud => [${generated.join(", ")}])`;
    }
}