import { readFileSync, writeFileSync } from "fs";
import { InternalInstructionNode } from "./ast/types";
import { buildAST } from "./ast";
import { generateFromAST } from "./generator";

function recursiveLogAST(node: InternalInstructionNode, tabs: number = 0) {
    console.log(" ".repeat(tabs) + node.instruction);

    if (!("context" in node)) {
        return;
    }

    const entries = Object.entries(node.context as any) as [string, any][];

    for (const [key, value] of entries) {
        if (typeof value === "object" && "instruction" in value) {
            recursiveLogAST(value, tabs + 2);
        }
        else if (Array.isArray(value) && value[0].instruction) {
            value.forEach((val) => {
                recursiveLogAST(val, tabs + 2);
            });
        }
        else {
            console.log(" ".repeat(tabs + 2) + `${key}: ${JSON.stringify(value)}`);
        }
    }
}

async function main() {
    const command = process.argv[2];

    const file = process.argv[3];

    if (!file) {
        throw new Error(`File not found`);
    }

    const content = readFileSync(file).toString();

    const fileWithoutExtension = file.split(".")[0];

    switch (command) {
        case "ast":
            const astResp = buildAST(content);
            writeFileSync(process.argv[4] || `${fileWithoutExtension}.json`, JSON.stringify(astResp, null, 2));

            astResp.forEach((node) => {
                recursiveLogAST(node);
            });
            break;
        case "generate":
            writeFileSync(process.argv[4] || `${fileWithoutExtension}.js`, await generateFromAST(JSON.parse(content)));
            break;
        case "compile":
            const ast = buildAST(content);
            const generated = await generateFromAST(ast);

            writeFileSync(`${fileWithoutExtension}.js`, generated);
            break;
    }
}

main();

if (require.main === module) {
    main();
}