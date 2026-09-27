import type { Node } from '../../filesystem/types/directory.types.ts'
import type { Branch } from './branch.types.ts'
import type { StagingEntry } from './staging.types.ts'

export type Repo = {
    id: string,
    repoRoot: Node,
}

export type Status = {
    currentBranch: Branch,
    branches: Branch[],
    stagedAdditions: StagingEntry[],
    stagedDeletions: StagingEntry[],
    unstagedModifications: Node[],
    unstagedDeletions: string[],
    untrackedFiles: Node[]
}
