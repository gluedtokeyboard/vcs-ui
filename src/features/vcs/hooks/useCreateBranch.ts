import { useMutationWithStatus } from '../../explorer/hooks/useMutationWithStatus.ts'
import { VcsEvent } from '../events/eventTypes.ts'
import { createBranch } from '../api/branches.ts'

export default function useCreateBranch() {
    return useMutationWithStatus({
        mutationFn: createBranch,
        progressMessage: 'Creating Branch...',
        successMessage: 'Done',
        emitEventOnSuccess: VcsEvent.BRANCH_CREATED,
    })
}
