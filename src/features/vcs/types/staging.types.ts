export const StagingEntryType = {
    ADDITION: 'ADDITION',
    DELETION: 'DELETION',
} as const

export type StagingEntryType = typeof StagingEntryType[keyof typeof StagingEntryType]

export type StagingEntry = {
    id: string,
    repoId: string,
    relativePath: string,
    entryType: StagingEntryType,
}
