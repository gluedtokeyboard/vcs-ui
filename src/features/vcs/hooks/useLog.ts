import { useQuery } from '@tanstack/react-query'
import { log } from '../api/commit.ts'
import { logKeys } from '../queries/keys.ts'

export default function useLog(repoId: string | undefined) {
    return useQuery({
        queryKey: logKeys.detail(repoId!),
        queryFn() {
            return log({ repoId: repoId! })
        },
        enabled: !!repoId,
    })
}
