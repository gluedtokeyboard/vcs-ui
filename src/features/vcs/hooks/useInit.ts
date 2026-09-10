import { init } from '../api/repo.ts'
import { VcsEvent } from '../events/eventTypes.ts'
import { useMutationWithStatus } from '../../explorer/hooks/useMutationWithStatus.ts'

export default function useInit() {
    return useMutationWithStatus({
        mutationFn: init,
        progressMessage: 'Initializing Repository...',
        successMessage: 'Done',
        emitEventOnSuccess: VcsEvent.REPO_INIT,
    })
}
