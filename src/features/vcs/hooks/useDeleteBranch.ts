import { useMutationWithStatus } from '../../explorer/hooks/useMutationWithStatus.ts'
import { VcsEvent } from '../events/eventTypes.ts'
import { deleteBranch } from '../api/branches.ts'

export default function useDeleteBranch() {
    return useMutationWithStatus({
        mutationFn: deleteBranch,
        progressMessage: 'Deleting Branch...',
        successMessage: 'Done',
        emitEventOnSuccess: VcsEvent.BRANCH_DELETED,
    })
}
