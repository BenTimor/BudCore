import { nativeFunctions } from "./functions";
import { nativeTypes } from "./types";
import { nativeVariables } from "./variables";

export * from "./operators";

export const nativeNodes = [
    ...nativeFunctions,
    ...nativeTypes,
    ...nativeVariables,
]