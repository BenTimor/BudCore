import { IMemory } from "./memory";

export type Injections<InternalInstructionNode> = {
    memory: IMemory,
    filePath: string,
    blockPrefixElements: InternalInstructionNode[],
    currStringChar?: string,
};