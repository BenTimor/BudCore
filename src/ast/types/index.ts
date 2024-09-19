import { ASTBuilder, InstructionNode, InstructionParser, InstructionVisitor, ReturnedInstructionNode } from "engine";
import { Instructions } from "../../types/instructions";
import { Injections } from "./injections";
import { Type } from "./types";

export * from "./memory";
export * from "./injections";
export * from "./errors";

export type InternalInstructionNode<Context = undefined> = InstructionNode<Instructions, Context>;

export type ReturnedInternalInstructionNode<Context = undefined> = ReturnedInstructionNode<Instructions, Context>;

export abstract class InternalInstructionParser<Context = undefined> extends InstructionParser<Instructions, Context, Injections<InternalInstructionNode<unknown>>> {
    trace(cords: [number, number]): string {
        return `  > ${this.instruction} at ${this.injection.filePath}:${cords[0]}:${cords[1]}`;
    }
}

export class InternalASTBuilder extends ASTBuilder<Instructions, Injections<InternalInstructionNode<unknown>>> { }

export abstract class InternalInstructionVisitor extends InstructionVisitor<Instructions, Injections<InternalInstructionNode<unknown>>> {
    trace(cords: [number, number]): string {
        return `  > Visitor at ${this.injection.filePath}:${cords[0]}:${cords[1]}`; // TODO Maybe add name or something
    }
}

export type TypedContext = {
    type: Type;
};

export type BlockContext = {
    children: InternalInstructionNode<any>[];
};

export type FunctionContext = {
    defaults: Record<string, InternalInstructionNode<any>>;
    block: InternalInstructionNode<BlockContext>,
    type: {
        name: "function",
    },
} & TypedContext;

// TODO Move to a separate file
export type Context = {
    Parentheses: {
        children: InternalInstructionNode<any>[];
    } & TypedContext,
    Array: {
        children: InternalInstructionNode<any>[];
        type: {
            name: "array",
        }
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
        value?: InternalInstructionNode<any>;
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
        function: InternalInstructionNode<any>;
        args: Record<string, InternalInstructionNode<any> | InternalInstructionNode<any>[]>;
    } & TypedContext,
    Number: {
        value: number;
    } & TypedContext,
    FunctionDeclaration: FunctionContext,
    NativeFunction: {
        name: string,
    } & TypedContext,
    Literal: {
        value: string;
    } & TypedContext,
    Type: TypedContext,
}

export function isInstruction<Instruction extends Instructions>(node: any, instruction: Instruction): node is InternalInstructionNode<Instruction extends keyof Context ? Context[Instruction] : undefined> {
    return node?.instruction === instruction;
}

export function isTyped(node: InternalInstructionNode<any> | undefined): node is InternalInstructionNode<TypedContext> {
    return node !== undefined && "context" in node && "type" in node.context;
}