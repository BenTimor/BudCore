import { primitivesInstructions } from "./instructions/primitives";
import { variablesInstructions, variableVisitors } from "./instructions/variables";
import { BudError, Injections, InternalASTBuilder, InternalInstructionNode } from "./types";
import { Globals, Memory } from "./memory";
import { extrasInstructions } from "./instructions/extras";
import { Instructions } from "../types";
import { nativeNodes } from "./native";
import { blockedInstructions, blockedVisitors } from "./instructions/blocked";

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
    "=:>>",
    "=>>",
    "=:>",
    "=>",
    "->",
    "<=",
    ">=",
    "\\",
    "\"",
    "\'",
    "\`",
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
    "[",
    "]",
    ":",
    "_",
    ">",
    "<",
    "!",
]

function astBuilderFactory(content: string, filePath: string) {
    return new InternalASTBuilder(content, [
        ...variablesInstructions,
        ...primitivesInstructions,
        ...blockedInstructions,
        ...extrasInstructions,
    ], [
        ...blockedVisitors,
        ...variableVisitors,
    ], {
        memory: new Memory(new Globals()),
        filePath,
        blockPrefixElements: [],
        currentBlockIdentifier: "DEFAULT",
    }, {
        spaceOut: stringsToSpaceOut,
        errors: {
            missingStopInstruction: (stopAt: Instructions[]) => {
                throw new MissingInstructions(stopAt);
            },
            instructionDoesntExist: (token: string, _tokenIndex: number, _tokens: string[], cords: number[], inject: Injections<InternalInstructionNode<unknown>>) => {
                throw new InstructionNotFound(token, inject.filePath, cords);
            }
        }
    });
}

export function injectGlobals(astBuilder: InternalASTBuilder) {
    for (const node of nativeNodes) {
        astBuilder.addNode(node);
    }
}

export function buildAST(content: string, filePath: string = "", shouldInjectGlobals: boolean = true) {
    const astBuilder = astBuilderFactory(content, filePath);

    if (shouldInjectGlobals) {
        injectGlobals(astBuilder);
    }

    const ast = astBuilder.build();

    return ast;
}