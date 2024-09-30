import { extrasGenerators, blockedGenerators, primitiveGenerators, variableGenerators } from "./instructions";
import { readFileSync, writeFileSync } from "fs";
import { InternalInstructionNode } from "../ast/types";
import { InternalGenerator } from "./types";

// TODO Import a library and not a file
const start = `
const { Bud } = require("bud");
const bud = new Bud();
`;

const end = `
;

exports.default = bud.exports;
`

const generator = new InternalGenerator([
    ...variableGenerators,
    ...primitiveGenerators,
    ...blockedGenerators,
    ...extrasGenerators,
]);

export async function generateFromAST(ast: InternalInstructionNode[]) {
    const block = await generator.generateInBlock("ROOT", ast);

    return start + "\n" + block + "\n" + end;
}

if (require.main === module) {    
    const cmd = process.argv[2];
    const file = process.argv[3];

    const content = JSON.parse(readFileSync(file).toString());

    if (cmd === "generate") {
        generateFromAST(content).then(res => {
            writeFileSync("output.js", res);
            console.log("Generated output.js");
        });
    }
    else {
        console.error(`Unknown command: ${cmd}`);
    }
}