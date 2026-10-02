import { useMutationWithStatus } from '../../explorer/hooks/useMutationWithStatus.ts'
import { merge } from '../api/commit.ts'
import { VcsEvent } from '../events/eventTypes.ts'

export default function useMerge() {
    return useMutationWithStatus({
        mutationFn: merge,
        progressMessage: 'Merging...',
        successMessage: 'Done',
        emitEventOnSuccess: VcsEvent.MERGE_SUCCESS,
        emitEventOnError: VcsEvent.MERGE_FAILURE,
    })
}
