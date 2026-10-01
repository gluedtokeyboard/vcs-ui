import type { Branch } from '../../../types/branch.types.ts'
import icon from './checkoutBranch.svg'
import useCheckoutBranch from '../../../hooks/useCheckoutBranch.ts'
import BranchOperationButton from '../BranchOperationButton/BranchOperationButton.tsx'

export default function CheckoutBranch({ branch, isCurrentBranch }: { branch: Branch, isCurrentBranch: boolean }) {
    const checkoutBranch = useCheckoutBranch()

    return <BranchOperationButton
        icon={icon}
        text='Checkout Branch'
        branch={branch}
        isCurrentBranch={isCurrentBranch}
        mutationFn={checkoutBranch}
    />
}
