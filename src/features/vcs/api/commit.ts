import { type Commit, CommitType } from '../types/commit.types.ts'
import { REPO_ENDPOINT } from './repo.ts'
import api from '../../../shared/lib/api.ts'

function commitEndpoint(repoId: string) {
    return `${REPO_ENDPOINT}/${repoId}/commits`
}

export async function commit({ repoId, message }: { repoId: string, message: string }): Promise<Commit> {
    // @ts-expect-error
    return api.post<Commit>(commitEndpoint(repoId), {
        type: CommitType.NORMAL,
        message,
    })
}

export async function log({ repoId }: { repoId: string }): Promise<Commit[]> {
    // @ts-expect-error
    return api.get<Commit[]>(commitEndpoint(repoId))
}

export async function merge({ repoId, branchId }: { repoId: string, branchId: string }): Promise<Commit> {
    // @ts-expect-error
    return api.post<Commit>(commitEndpoint(repoId), {
        type: CommitType.MERGE,
        branchId,
    })
}
