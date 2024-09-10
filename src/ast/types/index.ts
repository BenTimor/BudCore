import { ASTBuilder, InstructionNode, InstructionParser, ReturnedInstructionNode } from "engine";
import { Instructions } from "../../types/instructions";
import { Injections } from "./injections";
import { Types } from "./types";
import { FunctionParameter } from "./functions";

export * from "./memory";
export * from "./injections";

export type InternalInstructionNode<Context = undefined> = InstructionNode<Instructions, Context>;

export type ReturnedInternalInstructionNode<Context = undefined> = ReturnedInstructionNode<Instructions, Context>;

export abstract class InternalInstructionParser<Context = undefined> extends InstructionParser<Instructions, Context, Injections> { }

export class InternalASTBuilder extends ASTBuilder<Instructions, Injections> { }

export type TypedContext = {
    type: Types;
};

export type BlockContext = {
    children: InternalInstructionNode<any>[];
};

export type Context = {
    Parentheses: {
        children: InternalInstructionNode<any>[];
    } & TypedContext,
    Operator: {
        left: InternalInstructionNode<any>;
        right: InternalInstructionNode<any>;
        precedence: number;
        function: string;
    } & TypedContext,
    Block: BlockContext,
    Proxy: {
        identifier: string;
        block: InternalInstructionNode<any>;
    },
    VariableRead: {
        identifier: string;
    } & TypedContext,
    VariableDeclaration: {
        identifier: string;
        value?: InternalInstructionNode<any>;
        name: string;
        mutable: boolean;
        variableType: Types;
    },
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
    FunctionDeclaration: {
        spread: "NoSpread" | "ArraySpread" | "ObjectSpread" | "AllSpread";
        parameters: FunctionParameter<InternalInstructionNode<any>>[],
        block: InternalInstructionNode<BlockContext>,
    } & TypedContext,
    FunctionParameters: {},
}

export function isInstruction<Instruction extends Instructions>(node: InternalInstructionNode<any> | undefined, instruction: Instruction): node is InternalInstructionNode<Instruction extends keyof Context ? Context[Instruction] : undefined> {
    return node?.instruction === instruction;
}

export function isTyped(node: InternalInstructionNode<any>): node is InternalInstructionNode<TypedContext> {
    return "context" in node && "type" in node.context;
}