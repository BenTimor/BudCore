import { primitivesInstructions } from "./instructions/primitives";
import { variablesInstructions } from "./instructions/variables";
import { InternalASTBuilder } from "./types";
import { Memory } from "./memory";
import { extrasInstructions } from "./instructions/extras";
import { functionsInstructions, functionVisitors } from "./instructions/functions";

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
    });
}

export function buildAST(content: string, filePath: string = "") {
    const astBuilder = astBuilderFactory(filePath);

    const ast = astBuilder.fromContent(content);

    return ast;
}