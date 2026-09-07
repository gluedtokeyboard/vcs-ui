import { VCS_API_BASE_URL } from '../config/api.ts'
import api from '../../../shared/lib/api.ts'
import type { Repo } from '../types/repo.types.ts'

export const REPO_ENDPOINT = `${VCS_API_BASE_URL}/repos`

export async function init(repo: { repoRootId: string }): Promise<Repo> {
    // @ts-ignore
    return await api.post<Repo>(REPO_ENDPOINT, repo)
}
