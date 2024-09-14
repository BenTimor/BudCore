import { Instructions } from "../../../../types";
import { nativeOperators } from "../../../native";
import { Context, InternalInstructionParser, isInstruction, isTyped, ReturnedInternalInstructionNode } from "../../../types";
import { InvalidLeftValue, InvalidRightValue, MissingLeftValue, MissingRightValue, OperatorNotFound } from "../errors";

export class OperatorParser extends InternalInstructionParser<Context["Operator"]> {
    instruction: Instructions = "Operator";

    check(): boolean {
        return !!nativeOperators[this.arg];
    }

    handle(): ReturnedInternalInstructionNode<Context["Operator"]> {
        const left = this.astBuilder.nodes.pop();

        if (!left) {
            throw new MissingLeftValue();
        }

        if (!isTyped(left)) {
            throw new InvalidLeftValue();
        }

        const right = this.next();

        if (!right) {
            throw new MissingRightValue();
        }

        if (!isTyped(right)) {
            throw new InvalidRightValue();
        }

        const leftType = left.context.type;
        const rightType = right.context.type;

        const operator = nativeOperators[this.arg].find((operator) => {
            return operator.leftType === leftType && operator.rightType === rightType;
        });

        if (!operator) {
            throw new OperatorNotFound(this.arg, leftType, rightType);
        }

        if (isInstruction(left, "Operator")) {
            if (operator.precedence <= left.context.precedence) {
                return {
                    instruction: "Operator",
                    context: {
                        left: left,
                        right: right,
                        type: operator.returnType,
                        precedence: operator.precedence,
                        function: operator.functionIdentifier,
                    },
                };
            }
            else {
                let current = left;

                while (true) {
                    const next = current.context.right;

                    if (!next || !isInstruction(next, "Operator") || next.context.precedence >= operator.precedence) {
                        break;
                    }

                    current = next;
                }

                current.context.right = {
                    instruction: "Operator",
                    context: {
                        left: current.context.right,
                        right: right,
                        type: operator.returnType,
                        precedence: operator.precedence,
                        function: operator.functionIdentifier,
                    },
                    endsAt: this.nextIndex,
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
                    type: operator.returnType,
                    precedence: operator.precedence,
                    function: operator.functionIdentifier,
                },
            };
        }
    }
}
