import { useQuery } from '@tanstack/react-query'
import { status } from '../api/repo.ts'
import { statusKeys } from '../queries/keys.ts'

export default function useStatus(repoId: string | undefined) {
    return useQuery({
        queryKey: statusKeys.detail(repoId!),
        queryFn() {
            return status({ repoId: repoId! })
        },
        enabled: !!repoId,
    })
}
