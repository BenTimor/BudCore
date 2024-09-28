export type BlockedInstructions =
    | "If"
    | "Else"
    | "FunctionCall"
    | "FunctionDeclaration"
    | "Block"
    | "BlockEnd"
    | "BlockStart"
    | "Return"
    | "BlockSpecification"
    | "Continue";