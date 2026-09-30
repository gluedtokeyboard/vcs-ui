import { useQuery } from '@tanstack/react-query'
import { branchKeys } from '../queries/keys.ts'
import { getBranches } from '../api/branches.ts'

export default function useBranches(repoId: string | undefined) {
    return useQuery({
        queryKey: branchKeys.all(repoId!),
        queryFn() {
            return getBranches({ repoId: repoId! })
        },
        enabled: !!repoId,
    })
}
