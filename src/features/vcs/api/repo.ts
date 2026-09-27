import { VCS_API_BASE_URL } from '../config/api.ts'
import api from '../../../shared/lib/api.ts'
import type { Repo, Status } from '../types/repo.types.ts'

export const REPO_ENDPOINT = `${VCS_API_BASE_URL}/repos`

export async function init(repo: { repoRootId: string }): Promise<Repo> {
    // @ts-ignore
    return await api.post<Repo>(REPO_ENDPOINT, repo)
}

export async function resolveRepo({ directoryId }: { directoryId: string }): Promise<Repo> {
    // @ts-expect-error
    return await api.get<Repo>(`${REPO_ENDPOINT}?directoryId=${directoryId}`)
}

export async function status({ repoId } : { repoId: string } ): Promise<Status> {
    // @ts-expect-error
    return await api.get<Status>(`${REPO_ENDPOINT}/${repoId}/status`)
}
