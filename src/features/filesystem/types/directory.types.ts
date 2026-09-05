export type Directory = {
    id: string,
    path: string,
    contents: Node[],
}

export type Node = {
    id: string,
    path: string,
    type: NodeType
}

export const NodeType = {
    FILE: 'FILE',
    DIRECTORY: 'DIRECTORY',
} as const

export type NodeType = typeof NodeType[keyof typeof NodeType]
