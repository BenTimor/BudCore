import { NativeOperatorsMap } from "../../types/operators";
import { booleanOperators } from "./boolean";
import { numberOperators } from "./number";

export const nativeOperators: NativeOperatorsMap = {};

const importedOperators = [
    numberOperators,
    booleanOperators,
];

for (const operators of importedOperators) {
    for (const operator in operators) {
        if (nativeOperators[operator] === undefined) {
            nativeOperators[operator] = [];
        }

        nativeOperators[operator].push(...operators[operator]);
    }
}