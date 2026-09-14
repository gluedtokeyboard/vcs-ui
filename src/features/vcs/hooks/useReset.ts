import { useMutationWithStatus } from '../../explorer/hooks/useMutationWithStatus.ts'
import { reset } from '../api/workingTree.ts'
import { VcsEvent } from '../events/eventTypes.ts'

export default function useReset() {
    return useMutationWithStatus({
        mutationFn: reset,
        progressMessage: 'Resetting...',
        successMessage: 'Done',
        emitEventOnSuccess: VcsEvent.RESET,
    })
}
