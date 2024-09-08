import { Generator } from "engine";
import { primitiveGenerators, variableGenerators } from "./instructions";
import { readFileSync, writeFileSync } from "fs";

// TODO Import a library and not a file
const start = `
import * as Bud from "./bud";
`;

const generator = new Generator([
    ...variableGenerators,
    ...primitiveGenerators,
]);

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