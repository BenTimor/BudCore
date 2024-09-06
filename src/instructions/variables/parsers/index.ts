import { DeclarationParser } from "./declaration";
import { NameParser } from "./name";
import { ReadParser } from "./read";

export const variablesInstructions = [
    DeclarationParser,
    NameParser,
    ReadParser,
];