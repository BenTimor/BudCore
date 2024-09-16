import { Type } from "./types/types";

export function typesEqual(type1: Type, type2: Type): boolean {
    if (type1.name === "any" || type2.name === "any") {
        return true;
    }

    if (type1.name !== type2.name) {
        return false;
    }

    if (type1.name === "function" && type2.name === "function") {
        if (type1.parameters.length !== type2.parameters.length) {
            return false;
        }

        for (let i = 0; i < type1.parameters.length; i++) {
            if (!typesEqual(type1.parameters[i].type, type2.parameters[i].type)) {
                return false;
            }
        }

        return typesEqual(type1.returnType, type2.returnType);
    }

    if (type1.name === "tuple" && type2.name === "tuple") {
        if (type1.elements.length !== type2.elements.length) {
            return false;
        }

        for (let i = 0; i < type1.elements.length; i++) {
            if (!typesEqual(type1.elements[i], type2.elements[i])) {
                return false;
            }
        }

        return true;
    }

    if (type1.name === "array" && type2.name === "array") {
        return typesEqual(type1.elementType, type2.elementType);
    }

    if (type1.name === "object" && type2.name === "object") {
        return typesEqual(type1.key, type2.key) && typesEqual(type1.value, type2.value);
    }

    if (type1.name === "struct" && type2.name === "struct") {
        const keys1 = Object.keys(type1.fields);
        const keys2 = Object.keys(type2.fields);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            if (!typesEqual(type1.fields[key], type2.fields[key])) {
                return false;
            }
        }

        return true;
    }

    if (type1.name === "reference" && type2.name === "reference") {
        return type1.ref === type2.ref;
    }

    if (type1.name === "type" && type2.name === "type") {
        return typesEqual(type1.type, type2.type);
    }

    return true;
}