import { Generator } from "engine";
import { extrasGenerators, functionGenerators, primitiveGenerators, variableGenerators } from "./instructions";
import { readFileSync, writeFileSync } from "fs";
import { InternalInstructionNode } from "../ast/types";

// TODO Import a library and not a file
const start = `
const Bud = require("bud");
`;

const generator = new Generator([
    ...variableGenerators,
    ...primitiveGenerators,
    ...functionGenerators,
    ...extrasGenerators,
]);

export async function generateFromAST(ast: InternalInstructionNode[]) {
    const res = await generator.generate(ast);
    return start + "\n" + res;
}

if (require.main === module) {    
    const cmd = process.argv[2];
    const file = process.argv[3];

    const content = JSON.parse(readFileSync(file).toString());

    if (cmd === "generate") {
        generator.generate(content).then(res => {
            writeFileSync("output.js", start + "\n" + res);
            console.log("Generated output.js");
        });
    }
    else {
        console.error(`Unknown command: ${cmd}`);
    }
}