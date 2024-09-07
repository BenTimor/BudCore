import { Instructions, ReturnedInternalInstructionNode, InternalInstructionParser } from "../../../types";
import { nativeOperators } from "../../../native/operators";

export class OperatorParser extends InternalInstructionParser {
    instruction: Instructions = "Operator";

    check(): boolean {
        return !!nativeOperators[this.arg];
    }

    handle(): ReturnedInternalInstructionNode {
        const left = this.astBuilder.nodes.pop();

        if (!left) {
            throw new Error("Invalid operator usage");
        }

        const right = this.next();

        if (!right) {
            throw new Error("Invalid operator usage");
        }

        const leftType = left.context.type;
        const rightType = right.context.type;

        const operator = nativeOperators[this.arg].find((operator) => {
            return operator.leftType === leftType && operator.rightType === rightType;
        });

        if (!operator) {
            throw new Error("Invalid operator usage");
        }

        if (left.instruction === "Operator") {
            if (operator.precedence <= left.context.precedence) {
                return {
                    instruction: "Operator",
                    context: {
                        left: left,
                        right: right,
                        type: "number", // TODO Use the function identifier to get the type
                        precedence: operator.precedence,
                        function: operator.functionIdentifier,
                    },
                };
            }
            else {
                let current = left;

                while (true) {
                    const next = current.context.right;

                    if (!next || next.instruction !== "Operator" || next.context.precedence >= operator.precedence) {
                        break;
                    }

                    current = next;
                }

                current.context.right = {
                    instruction: "Operator",
                    context: {
                        left: current.context.right,
                        right: right,
                        type: "number", // TODO Use the function identifier to get the type
                        precedence: operator.precedence,
                        function: operator.functionIdentifier,
                    },
                };                

                return left;
            }
        }
        else {
            return {
                instruction: "Operator",
                context: {
                    left: left,
                    right: right,
                    type: "number", // TODO Use the function identifier to get the type
                    precedence: operator.precedence,
                    function: operator.functionIdentifier,
                },
            };
        }
    }
}
