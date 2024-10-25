import { Instructions } from "../../../../types";
import { Context, InternalInstructionParser, ReturnedInternalInstructionNode } from "../../../types";
import { StringType } from "../../../types/types";
import { InvalidEscapeCharacter, StringNotClosed } from "../errors";

export class StringEndParser extends InternalInstructionParser {
    instruction: Instructions = "StringEnd";
    limited: boolean = true;

    check(): boolean {
        return this.arg === this.injection.currStringChar;
    }

    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: "StringEnd",
        };
    }
}

export class StringContentParser extends InternalInstructionParser {
    instruction: Instructions = "StringContent";
    limited: boolean = true;

    check(): boolean {
        return this.arg !== this.injection.currStringChar;
    }

    handle(): ReturnedInternalInstructionNode {
        return {
            instruction: "StringContent",
        };
    }
}

export class StringParser extends InternalInstructionParser<Context["String"]> {
    instruction: Instructions = "String";

    check(): boolean {
        return ["\"", "'", "`"].includes(this.arg[0]);
    }

    handle(): ReturnedInternalInstructionNode<Context["String"]> {
        this.injection.currStringChar = this.arg[0];
        let content = "";
        let stringCharsAmount = 1;

        let [line, col] = this.astBuilder.getLineAndColumn(this.nextIndex);
        const lines = this.content.split("\n");

        col++;

        while (true) {
            const lineContent = lines[line - 1];

            if (lineContent === undefined) {
                throw new StringNotClosed();
            }

            const char = lineContent[col - 1];

            if (char === undefined) {
                line++;
                col = 1;
                continue;
            }

            if (char === this.arg[0]) {
                break;
            }

            if (char === "\\") {
                const nextChar = lineContent[col];

                switch (nextChar) {
                    case this.arg[0]:
                        col += 2;
                        content += nextChar;
                        stringCharsAmount++;
                        break;
                    case "\\":
                        col += 2;
                        content += "\\";
                        break;
                    case "n":
                        col += 2;
                        content += "\n";
                        break;
                    default:
                        throw new InvalidEscapeCharacter(nextChar);
                }

                continue;
            }

            if (char === "\r") {
                content += "\n";
            }
            else {
                content += char;
            }

            col++;
        }

        // Skipping the tokens
        for (let i = 0; i < stringCharsAmount; i++) {            
            this.nextChildren(["StringEnd", "StringContent"], ["StringEnd"]); // TODO Add errors            
        }        

        return {
            instruction: "String",
            context: {
                value: content,
                type: new StringType(),
            }
        }
    }
}