export type VoidType = {
    name: "void",
};

export type NumberType = {
    name: "number",
};

export type FunctionParameterType = {
    name: string,
    type: Type,
    mutable: boolean,
    optional: boolean,
};

export type FunctionType = {
    name: "function",
    parameters: FunctionParameterType[],
    spread: "NoSpread" | "ArraySpread" | "ObjectSpread" | "AllSpread",
    returnType: Type,
};

export type AnyType = {
    name: "any",
};

export type TupleType = {
    name: "tuple",
    elements: Type[],
};

export type ArrayType = {
    name: "array",
    elementType: Type,
};

export type ObjectType = {
    name: "object",
    key: Type,
    value: Type,
};

export type StringType = {
    name: "string",
}

export type BooleanType = {
    name: "boolean",
};

export type StructType = {
    name: "struct",
    fields: Record<string, Type>,
};

export type ReferenceType = {
    name: "reference",
    ref: string,
};

export type TypeType = {
    name: "type",
    type: Type,
};

export type Type = 
    | VoidType
    | NumberType
    | FunctionType
    | AnyType
    | TupleType
    | ArrayType
    | ObjectType
    | StringType
    | BooleanType
    | StructType
    | ReferenceType
    | TypeType
;
