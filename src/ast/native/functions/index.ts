import { NativeFunctionsMap } from "../../types/functions";

export const nativeFunctionsIdentifiers: Record<string, string> = {
    log: "NativeLog"
};

export const nativeFunctions: NativeFunctionsMap = {
    "NativeLog": {
        args: [
            { name: "values", type: "any", spread: true }
        ],
        returnType: "void",
    }
};