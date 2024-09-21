import { NumberParser } from "./number";
import { StringContentParser, StringEndParser, StringParser } from "./string";

export const primitivesInstructions = [
    NumberParser,
    StringParser,
    StringContentParser,
    StringEndParser,
];