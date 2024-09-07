import { readFileSync, writeFileSync } from "fs";
import { primitivesInstructions } from "./instructions/primitives";
import { variablesInstructions } from "./instructions/variables";
import { InternalASTBuilder, InternalInstructionNode } from "./types";
import { Memory } from "./memory";
import { extrasInstructions } from "./instructions/extras";

function astBuilderFactory() {
    return new InternalASTBuilder([
        ...variablesInstructions,
        ...primitivesInstructions,
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
]

export function buildAST(content: string) {
    const astBuilder = astBuilderFactory();

    const ast = astBuilder.fromContent(addSpacesAroundMatches(content, stringsToSpaceOut));

    return ast;
}

function recursiveLogOperatorsOrder(node: InternalInstructionNode, tabs: number = 0) {
    console.log(" ".repeat(tabs) + (node.context.function || node.context.value));

    if (node.instruction === "Operator") {
        recursiveLogOperatorsOrder(node.context.left, tabs + 2);
        recursiveLogOperatorsOrder(node.context.right, tabs + 2);
    }
}

if (require.main === module) {
    const file = process.argv[2];

    if (!file) {
        throw new Error("File not found");
    }

    const content = readFileSync(file);

    const resp = buildAST(content.toString());

    // recursiveLogOperatorsOrder(resp[0].context.value);
    // recursiveLogOperatorsOrder(resp[0]);

    writeFileSync("ast.json", JSON.stringify(resp, null, 2));
}
