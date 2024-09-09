import { Context, InternalInstructionNode } from "../../../../ast/types";
import { InternalInstructionGenerator } from "../../../types";

export class CallGenerator extends InternalInstructionGenerator {
    async check(node: InternalInstructionNode) {
        return node.instruction === "FunctionCall";
    }

    async handle(node: InternalInstructionNode<Context["FunctionCall"]>) {
        const argsEntries = Object.entries(node.context.args);
        const newArgsEntries = [];

        for (const [key, value] of argsEntries) {
            let newValue;

            if (Array.isArray(value)) {
                newValue = await Promise.all(value.map(v => this.generator.generateOne(v)));
            }
            else {
                newValue = await this.generator.generateOne(value as InternalInstructionNode);
            }

            newArgsEntries.push([key, newValue]);
        }

        let argsStrBuilder = ["{"];

        for (const [key, value] of newArgsEntries) {
            if (Array.isArray(value)) {
                argsStrBuilder.push(`${key}: [${value.join(", ")}],`);
            }
            else {
                argsStrBuilder.push(`${key}: ${value},`);
            }
        }

        argsStrBuilder.push("}");

        return `Bud.Variables.get("${node.context.identifier}")(${argsStrBuilder.join(" ")})`;
    }
}