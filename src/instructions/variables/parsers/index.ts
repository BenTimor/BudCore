import { DeclarationParser } from "./declaration";
import { MutableParser } from "./mutable";
import { NameParser } from "./name";
import { ReadParser } from "./read";

export const variablesInstructions = [
    DeclarationParser,
    NameParser,
    ReadParser,
    MutableParser,
];