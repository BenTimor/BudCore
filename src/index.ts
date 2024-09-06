import { readFileSync, writeFileSync } from "fs";
import { primitivesInstructions } from "./instructions/primitives";
import { variablesInstructions } from "./instructions/variables";
import { InternalASTBuilder } from "./types";

const astBuilder = new InternalASTBuilder([
    ...variablesInstructions,
    ...primitivesInstructions,
]);

const file = process.argv[2];

if (!file) {
    throw new Error("File not found");
}

const content = readFileSync(file);

const resp = astBuilder.fromContent(content.toString());

writeFileSync("ast.json", JSON.stringify(resp, null, 2));