import type { Branch } from '../../../types/branch.types.ts'
import Button, { type ButtonProps } from '../../../../../shared/components/buttons/Button/Button.tsx'

type BranchOperationButtonProps = {
    branch: Branch,
    isCurrentBranch: boolean,
    mutationFn: {
        mutate: (branchData: {
            repoId: string,
            branchId: string,
        }) => void,
    },
} & Omit<ButtonProps, 'onClick' | 'disabled'>

export default function BranchOperationButton(
        { icon, text, branch, isCurrentBranch, mutationFn }: BranchOperationButtonProps) {
    function handleClick() {
        mutationFn.mutate({
            repoId: branch.repoId,
            branchId: branch.id,
        })
    }

    return <Button icon={icon} text={text} onClick={handleClick} disabled={isCurrentBranch} />
}
