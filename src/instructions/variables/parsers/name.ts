import { InternalVariablesNode, InternalVariablesParser, VariablesInstructions } from "../../../types";

export class NameParser extends InternalVariablesParser {
    instruction: VariablesInstructions = "VariableName";
    limited = true;
    
    check(): boolean {
        return this.arg.match(/^[a-zA-Z_]/) !== null;
    }
    handle(): InternalVariablesNode {
        return {
            instruction: "VariableName",
            context: {
                identifier: this.arg,
            },
        };
    }
}