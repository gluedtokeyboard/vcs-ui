export const CommitType = {
    NORMAL: 'NORMAL',
    MERGE: 'MERGE',
} as const

export type CommitType = typeof CommitType[keyof typeof CommitType]

export type Commit = {
    repoId: string,
    hash: string,
    message: string,
    timestamp: string,
    parent1: Commit,
    parent2: Commit,
    type: CommitType,
}
