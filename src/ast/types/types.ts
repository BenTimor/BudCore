export type VoidType = {
    name: "void",
};

export type NumberType = {
    name: "number",
};

export type FunctionType = {
    name: "function",
    parameters: Type[],
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
    | StructType
    | ReferenceType
    | TypeType
;
