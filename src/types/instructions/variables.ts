import { InstructionNode, InstructionParser } from "engine";

export type VariablesInstructions =
    | "VariableName"
    | "VariableDeclaration"
    | "VariableAssignment"
    | "VariableRead"; 

export abstract class InternalVariablesParser extends InstructionParser<VariablesInstructions> {}

export type InternalVariablesNode = InstructionNode<VariablesInstructions>;