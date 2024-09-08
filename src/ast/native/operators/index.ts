import { NativeOperatorsMap } from "../../types/operators";
import { numberOperators } from "./number";

export const nativeOperators: NativeOperatorsMap = {};

const importedOperators = [
    numberOperators,
];

for (const operators of importedOperators) {
    for (const operator in operators) {
        if (nativeOperators[operator] === undefined) {
            nativeOperators[operator] = [];
        }

        nativeOperators[operator].push(...operators[operator]);
    }
}