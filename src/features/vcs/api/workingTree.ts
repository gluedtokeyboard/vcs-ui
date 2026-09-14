import { REPO_ENDPOINT } from './repo.ts'
import api from '../../../shared/lib/api.ts'

function workingTreeEndpoint(repoId: string) {
    return `${REPO_ENDPOINT}/${repoId}/working-tree`
}

export async function reset({ repoId, commitPrefix }: { repoId: string, commitPrefix: string }): Promise<void> {
    // @ts-expect-error
    return api.put<void>(workingTreeEndpoint(repoId), {
        commitPrefix,
    })
}
