import { ASTBuilder, InstructionNode, InstructionParser, ReturnedInstructionNode } from "engine";
import { Instructions } from "../../types/instructions";
import { Injections } from "./injections";
import { Types } from "./types";

export * from "./memory";
export * from "./injections";

export type InternalInstructionNode<Context = undefined> = InstructionNode<Instructions, Context>;

export type ReturnedInternalInstructionNode<Context = undefined> = ReturnedInstructionNode<Instructions, Context>;

export abstract class InternalInstructionParser<Context = undefined> extends InstructionParser<Instructions, Context, Injections> { }

export class InternalASTBuilder extends ASTBuilder<Instructions, Injections> { }

export type TypedContext = {
    type: Types;
};

export type Context = {
    Parentheses: {
        value: InternalInstructionNode<any>;
    } & TypedContext,
    Operator: {
        left: InternalInstructionNode<any>;
        right: InternalInstructionNode<any>;
        precedence: number;
        function: string;
    } & TypedContext,
    Block: {
        children: InternalInstructionNode<any>[];
    },
    Proxy: {
        identifier: string;
        block: InternalInstructionNode<any>;
    },
    VariableRead: {
        identifier: string;
    } & TypedContext,
    VariableDeclaration: {
        identifier: string;
        value: InternalInstructionNode<any>;
        name: string;
        mutable: boolean;
    } & TypedContext,
    VariableName: {
        name: string;
    },
    VariableAssignment: {
        identifier: string;
        value: InternalInstructionNode<any>;
    } & TypedContext,
    FunctionCall: {
        identifier: string;
        args: Record<string, InternalInstructionNode<any> | InternalInstructionNode<any>[]>;
    } & TypedContext,
    Number: {
        value: number;
    } & TypedContext,
}

export function isInstruction<Instruction extends Instructions>(node: InternalInstructionNode<any> | undefined, instruction: Instruction): node is InternalInstructionNode<Instruction extends keyof Context ? Context[Instruction] : undefined> {
    return node?.instruction === instruction;
}

export function isTyped(node: InternalInstructionNode<any>): node is InternalInstructionNode<TypedContext> {
    return "context" in node && "type" in node.context;
}