import { NativeFunctionsMap } from "../../types/functions";

export const nativeFunctions: NativeFunctionsMap = {
    "log": {
        identifier: "NativeLog",
        args: [
            { name: "values", type: "any", spread: true }
        ],
        returnType: "void",
    }
};