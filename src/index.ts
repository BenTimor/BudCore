import { readFileSync, writeFileSync } from "fs";
import { InternalInstructionNode } from "./ast/types";
import { buildAST } from "./ast";
import { generateFromAST } from "./generator";
import { ChildError } from "engine";
import { resolve } from "path";

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
    const filePath = resolve(file);

    const fileWithoutExtension = file.split(".")[0];

    switch (command) {
        case "ast":
            try {
                const astResp = buildAST(content, filePath);
                writeFileSync(process.argv[4] || `${fileWithoutExtension}.json`, JSON.stringify(astResp, null, 2));

                astResp.forEach((node) => {
                    recursiveLogAST(node);
                });
            } catch (error) {
                if (error instanceof ChildError) {
                    console.error(error.message);
                    return;
                }
                throw error;
            }
            break;
        case "generate":
            writeFileSync(process.argv[4] || `${fileWithoutExtension}.js`, await generateFromAST(JSON.parse(content)));
            break;
        case "compile":
            const ast = buildAST(content, filePath);
            const generated = await generateFromAST(ast);

            writeFileSync(`${fileWithoutExtension}.js`, generated);
            break;
    }
}

if (require.main === module) {
    main();
}