import { REPO_ENDPOINT } from './repo.ts'
import api from '../../../shared/lib/api.ts'

function headEndpoint(repoId: string) {
    return `${REPO_ENDPOINT}/${repoId}/head`
}

export async function checkoutBranch({ repoId, branchId }: { repoId: string, branchId: string }): Promise<void> {
    await api.put<void>(headEndpoint(repoId), { branchId })
}
