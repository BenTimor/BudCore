import { nativeFunctions } from "./functions";
import { nativeTypes } from "./types";

export * from "./operators";

export const nativeNodes = [
    ...nativeFunctions,
    ...nativeTypes,
]