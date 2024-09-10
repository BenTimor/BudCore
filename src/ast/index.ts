import { primitivesInstructions } from "./instructions/primitives";
import { variablesInstructions } from "./instructions/variables";
import { InternalASTBuilder } from "./types";
import { Memory } from "./memory";
import { extrasInstructions } from "./instructions/extras";
import { functionsInstructions } from "./instructions/functions";

function astBuilderFactory() {
    return new InternalASTBuilder([
        ...variablesInstructions,
        ...primitivesInstructions,
        ...functionsInstructions,
        ...extrasInstructions,
    ], {
        memory: new Memory(),
    });
}

function escapeRegex(string: string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

function addSpacesAroundMatches(content: string, stringList: string[]): string {
    // Escape and sort strings by length in descending order
    const sortedStrings = stringList
        .map(escapeRegex)
        .sort((a, b) => b.length - a.length);

    // Create a regex pattern that matches any of the strings
    const pattern = sortedStrings.join('|');
    const regex = new RegExp(pattern, 'g');

    // Replace matches with spaces around them
    content = content.replace(regex, match => ` ${match} `);

    // Clean up extra spaces
    return content.replace(/\s+/g, ' ').trim();
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

export function buildAST(content: string) {
    const astBuilder = astBuilderFactory();

    const ast = astBuilder.fromContent(addSpacesAroundMatches(content, stringsToSpaceOut));

    return ast;
}