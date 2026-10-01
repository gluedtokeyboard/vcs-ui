import type { Branch } from '../../../types/branch.types.ts'
import icon from './deleteBranch.svg'
import useDeleteBranch from '../../../hooks/useDeleteBranch.ts'
import BranchOperationButton from '../BranchOperationButton/BranchOperationButton.tsx'

export default function DeleteBranch({ branch, isCurrentBranch }: { branch: Branch, isCurrentBranch: boolean }) {
    const deleteBranch = useDeleteBranch()

    return <BranchOperationButton
        icon={icon}
        text='Delete Branch'
        branch={branch}
        isCurrentBranch={isCurrentBranch}
        mutationFn={deleteBranch}
    />
}
