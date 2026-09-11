import type { StagingEntry, StagingEntryType } from '../types/staging.types.ts'
import { REPO_ENDPOINT } from './repo.ts'
import api from '../../../shared/lib/api.ts'

function stagingEndpoint(repoId: string) {
    return `${REPO_ENDPOINT}/${repoId}/staging`
}

export async function stageFile(
        { repoId, fileId, entryType }: { repoId: string, fileId: string, entryType: StagingEntryType }
): Promise<StagingEntry> {
    // @ts-expect-error
    return api.post<StagingEntry>(stagingEndpoint(repoId), {
        fileId,
        entryType,
    })
}
