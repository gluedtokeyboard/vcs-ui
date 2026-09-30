import { REPO_ENDPOINT, status } from './repo.ts'
import api from '../../../shared/lib/api.ts'
import type { Branch, BranchData } from '../types/branch.types.ts'

function branchEndpoint(repoId: string) {
    return `${REPO_ENDPOINT}/${repoId}/branches`
}

export async function createBranch({ repoId, branchName }: { repoId: string, branchName: string }): Promise<Branch> {
    // @ts-expect-error
    return api.post<Branch>(branchEndpoint(repoId), { name: branchName })
}

export async function deleteBranch({ repoId, branchId }: { repoId: string, branchId: string }): Promise<void> {
    await api.delete<Branch>(`${branchEndpoint(repoId)}/${branchId}`)
}

export async function getBranches(repo: { repoId: string }): Promise<BranchData> {
    const { currentBranch, branches } = await status(repo)
    return { currentBranch, branches }
}
