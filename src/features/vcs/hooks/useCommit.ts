import { useMutationWithStatus } from '../../explorer/hooks/useMutationWithStatus.ts'
import { commit } from '../api/commit.ts'
import { VcsEvent } from '../events/eventTypes.ts'

export function useCommit() {
    return useMutationWithStatus({
        mutationFn: commit,
        progressMessage: 'Committing...',
        successMessage: 'Done',
        emitEventOnSuccess: VcsEvent.COMMIT,
    })
}
