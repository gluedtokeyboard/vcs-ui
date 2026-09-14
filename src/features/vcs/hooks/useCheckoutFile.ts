import { useMutationWithStatus } from '../../explorer/hooks/useMutationWithStatus.ts'
import { checkoutFile } from '../api/workingTree.ts'
import { VcsEvent } from '../events/eventTypes.ts'

export default function useCheckoutFile() {
    return useMutationWithStatus({
        mutationFn: checkoutFile,
        progressMessage: 'Checking out file...',
        successMessage: 'Done',
        emitEventOnSuccess: VcsEvent.CHECKOUT_FILE,
    })
}
