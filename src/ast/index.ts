import { primitivesInstructions } from "./instructions/primitives";
import { variablesInstructions } from "./instructions/variables";
import { BudError, Context, Injections, InternalASTBuilder, InternalInstructionNode } from "./types";
import { Globals, Memory } from "./memory";
import { extrasInstructions } from "./instructions/extras";
import { functionsInstructions, functionVisitors } from "./instructions/functions";
import { Instructions } from "../types";

class InstructionNotFound extends BudError {
    constructor(instruction: string, filePath: string, cords: number[]) {
        super("InstructionNotFound", `Instruction ${instruction} not found at ${filePath}:${cords[0]}:${cords[1]}`);
    }
}

class MissingInstructions extends BudError {
    constructor(instruction: Instructions[]) {
        super("MissingInstructions", `Expected instructions: ${instruction.join(", ")}`);
    }
}

const stringsToSpaceOut = [
    "+",
    "-",
    "*",
    "/",
    "%",
    "=",
    ";",
    "(",
    ")",
    "{",
    "}",
    "=>",
    "=>>",
    "=:>",
    "=:>>",
    "...",
]

function astBuilderFactory(filePath: string) {
    return new InternalASTBuilder([
        ...variablesInstructions,
        ...primitivesInstructions,
        ...functionsInstructions,
        ...extrasInstructions,
    ], [
        ...functionVisitors,
    ], {
        memory: new Memory(new Globals()),
        filePath,
    }, {
        spaceOut: stringsToSpaceOut,
        errors: {
            missingStopInstruction: (stopAt: Instructions[]) => {
                throw new MissingInstructions(stopAt);
            },
            instructionDoesntExist: (token: string, _tokenIndex: number, _tokens: string[], cords: number[], inject: Injections) => {
                throw new InstructionNotFound(token, inject.filePath, cords);
            }
        }
    });
}

export function injectGlobals(astBuilder: InternalASTBuilder) {
    const logNativeFunction: InternalInstructionNode<Context["NativeFunction"]> = {
        instruction: "NativeFunction",
        endsAt: -1,
        context: {
            name: "log",
        }
    };

    const logVariable: InternalInstructionNode<Context["VariableDeclaration"]> = {
        instruction: "VariableDeclaration",
        identifier: "VAR_DECLARATION_NATIVE_LOG",
        endsAt: -1,
        context: {
            name: "log",
            mutable: false,
            variableType: "function",
            value: logNativeFunction,
        },
    };

    astBuilder.addNode(logVariable);
}

export function buildAST(content: string, filePath: string = "") {
    const astBuilder = astBuilderFactory(filePath);

    injectGlobals(astBuilder);

    const ast = astBuilder.fromContent(content);

    return ast;
}