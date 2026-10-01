import { useMutationWithStatus } from '../../explorer/hooks/useMutationWithStatus.ts'
import { VcsEvent } from '../events/eventTypes.ts'
import { checkoutBranch } from '../api/head.ts'

export default function useCheckoutBranch() {
    return useMutationWithStatus({
        mutationFn: checkoutBranch,
        progressMessage: 'Checking out branch...',
        successMessage: 'Done',
        emitEventOnSuccess: VcsEvent.CHECKOUT_BRANCH,
    })
}
