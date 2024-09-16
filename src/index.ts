import { readFileSync, writeFileSync } from "fs";
import { buildAST } from "./ast";
import { generateFromAST } from "./generator";
import { ChildError } from "engine";
import { resolve } from "path";

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