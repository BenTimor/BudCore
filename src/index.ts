#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { primitivesInstructions } from "./instructions/primitives";
import { variablesInstructions } from "./instructions/variables";
import { InternalASTBuilder, InternalInstructionNode, InternalInstructionParser } from "./types";
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

function recursiveLogOperatorsOrder(nodes: InternalInstructionNode[]) {
    nodes.forEach((node) => {
        if (node.instruction === "Operator") {
            recursiveLogOperatorOrder(node);
        }
        else {
            const values = Object.values(node.context);

            values.forEach((value) => {
                if (value.instruction === "Operator") {
                    recursiveLogOperatorOrder(value);
                }
                else if (!!value.instruction) {
                    recursiveLogOperatorsOrder([value]);
                }
            });
        }
    });
}

function recursiveLogOperatorOrder(node: InternalInstructionNode, tabs: number = 0) {
    console.log(" ".repeat(tabs) + (node.context.function || node.context.value || node.context.name));

    if (!node.context.left || !node.context.right) {
        return
    }

    recursiveLogOperatorOrder(node.context.left, tabs + 2);
    recursiveLogOperatorOrder(node.context.right, tabs + 2);
}

if (require.main === module) {    
    const cmd = process.argv[2];
    const file = process.argv[3];
    if (!file) {
        throw new Error("File not found");
    }    

    const content = readFileSync(file);

    switch (cmd) {
        case "compile":
            const resp = buildAST(content.toString());

            writeFileSync("ast.json", JSON.stringify(resp, null, 2));
            break;
        case "print-operations":
            const json = JSON.parse(content.toString());

            recursiveLogOperatorsOrder(json);
            break;
    }
}
