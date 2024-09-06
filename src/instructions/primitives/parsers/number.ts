import { InternalPrimitivesNode, InternalPrimitivesParser } from "../../../types";

export class NumberParser extends InternalPrimitivesParser {
    instruction: "Number" = "Number";
    
    check(): boolean {
        return isNaN(+this.arg) === false;
    }

    handle(): InternalPrimitivesNode {
        return {
            instruction: "Number",
            context: {
                value: +this.arg,
            },
        };
    }
}