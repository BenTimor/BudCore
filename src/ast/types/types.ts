export interface Type<Name extends string> {
    name: Name;

    assignableTo(other: Type<string>): boolean;
}

class BaseType<Name extends string> implements Type<Name> {
    constructor(public name: Name) {
    }

    defaultAssignableTo(other: Type<string>): boolean {
        return other.name === "any";
    }

    customAssignableTo(other: Type<string>): boolean {
        return this.name === other.name;
    }

    assignableTo(other: Type<string>): boolean {
        return this.defaultAssignableTo(other) || this.customAssignableTo(other);
    }
}

export class TypeType extends BaseType<"type"> {
    constructor() {
        super("type");
    }
}

export class AnyType extends BaseType<"any"> {
    constructor() {
        super("any");
    }

    assignableTo(other: Type<string>): boolean {
        return true;
    }
}

export class VoidType extends BaseType<"void"> {
    constructor() {
        super("void");
    }
}

export class NumberType extends BaseType<"number"> {
    constructor() {
        super("number");
    }
}

export class StringType extends BaseType<"string"> {
    constructor() {
        super("string");
    }
}

export class BooleanType extends BaseType<"boolean"> {
    constructor() {
        super("boolean");
    }
}

export class ArrayType extends BaseType<"array"> {
    constructor(public elementType: Type<string>) {
        super("array");
    }

    customAssignableTo(other: Type<string>): boolean {
        return other.name === "array"
            && this.elementType.assignableTo((other as ArrayType).elementType);
    }
}

export class TupleType extends BaseType<"tuple"> {
    constructor(public elements: Type<string>[]) {
        super("tuple");
    }

    customAssignableTo(other: Type<string>): boolean {
        return other.name === "tuple"
            && this.elements.length === (other as TupleType).elements.length
            && this.elements.every((element, index) => element.assignableTo((other as TupleType).elements[index]));
    }
}

export class FunctionParameterType extends BaseType<"functionParameter"> {
    constructor(public paramName: string, public type: Type<string>, public mutable: boolean, public optional: boolean) {
        super("functionParameter");
    }

    customAssignableTo(other: Type<string>): boolean {
        return other.name === "functionParameter"
            && this.paramName === (other as FunctionParameterType).paramName
            && this.type.assignableTo((other as FunctionParameterType).type)
            && this.mutable === (other as FunctionParameterType).mutable
            && this.optional === (other as FunctionParameterType).optional;
    }
}

export enum FunctionSpread {
    NoSpread = "NoSpread",
    ArraySpread = "ArraySpread",
    ObjectSpread = "ObjectSpread",
    AllSpread = "AllSpread",
}

export class FunctionType extends BaseType<"function"> {
    constructor(public parameters: FunctionParameterType[], public returns: Type<string>, public spread: FunctionSpread) {
        super("function");
    }

    customAssignableTo(other: Type<string>): boolean {
        return other.name === "function"
            && this.parameters.length === (other as FunctionType).parameters.length
            && this.parameters.every((parameter, index) => parameter.customAssignableTo((other as FunctionType).parameters[index]))
            && this.returns.assignableTo((other as FunctionType).returns)
            && this.spread === (other as FunctionType).spread;
    }
}