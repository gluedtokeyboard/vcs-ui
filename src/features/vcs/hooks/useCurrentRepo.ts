import { useQuery } from '@tanstack/react-query'
import { repoKeys } from '../queries/keys.ts'
import { resolveRepo } from '../api/repo.ts'
import { getCurrentWorkingDirectory } from '../../filesystem/utils.ts'
import { AxiosError } from 'axios'

export function useCurrentRepo() {
    return useQuery({
        queryKey: repoKeys.current(),

        async queryFn() {
            const directoryId = getCurrentWorkingDirectory().id
            let repo
            try {
                repo = await resolveRepo({ directoryId })
            } catch (error) {
                if (error instanceof AxiosError && error.status == 404) {
                    repo = null
                } else {
                    throw error
                }
            }
            return repo
        },
    })
}
