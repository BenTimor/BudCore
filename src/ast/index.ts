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
    // Sort the strings by length, longest to shortest
    const sortedList = stringList.sort((a, b) => b.length - a.length).map(escapeRegex);

    // Replace each string in content with spaces around it
    sortedList.forEach((str) => {
        const regex = new RegExp(`(${str})`, 'g'); // Create a regex to match the string globally
        content = content.replace(regex, ' $1 '); // Add space before and after the match
    });

    // Remove any extra spaces introduced (multiple spaces to a single space)
    return content;
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
]

export function buildAST(content: string) {
    const astBuilder = astBuilderFactory();

    const ast = astBuilder.fromContent(addSpacesAroundMatches(content, stringsToSpaceOut));

    return ast;
}