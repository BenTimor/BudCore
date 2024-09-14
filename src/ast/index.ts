import { primitivesInstructions } from "./instructions/primitives";
import { variablesInstructions } from "./instructions/variables";
import { BudError, Injections, InternalASTBuilder } from "./types";
import { Memory } from "./memory";
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
        memory: new Memory(),
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

export function buildAST(content: string, filePath: string = "") {
    const astBuilder = astBuilderFactory(filePath);

    const ast = astBuilder.fromContent(content);

    return ast;
}