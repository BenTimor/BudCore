import { InternalInstructionGenerator } from "../../../types";

export class SemicolonGenerator extends InternalInstructionGenerator {
    async check(node: any) {
        return node.instruction === "Semicolon";
    }

    async handle(node: any) {
        return "";
    }
}