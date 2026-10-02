import icon from './merge.svg'
import FormDialog from '../../../../shared/components/dialogs/FormDialog/FormDialog.tsx'
import DialogButton from '../../../../shared/components/buttons/DialogButton/DialogButton.tsx'
import { useForm } from 'react-hook-form'
import { useCurrentRepo } from '../../hooks/useCurrentRepo.ts'
import styles from '../../../../shared/styles/Form.module.css'
import useMerge from '../../hooks/useMerge.ts'
import useBranches from '../../hooks/useBranches.ts'
import type { BranchData } from '../../types/branch.types.ts'

export default function Merge() {
    const repo = useCurrentRepo().data
    const branchData = useBranches(repo?.id).data
    const merge = useMerge()

    function handleSubmit(branchId: string) {
        merge.mutate({
            repoId: repo!.id,
            branchId,
        })
    }

    const MergeDialogButton = DialogButton(MergeDialog)
    return <MergeDialogButton
        buttonProps={{
            text: 'Merge',
            icon,
            disabled: !branchData,
        }}
        dialogProps={{
            branchData: branchData!,
            onSubmit: handleSubmit,
        }}
    />
}

type MergeDialogProps = {
    branchData: BranchData,
    onClose: () => void,
    onSubmit: (branchId: string) => void,
}

function MergeDialog({ branchData: { currentBranch, branches }, onClose, onSubmit }: MergeDialogProps) {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const errorMessage = errors.branchId?.message as string | undefined
    const inputClass = errorMessage ? styles.inputError : styles.input

    const handleSubmit_ = handleSubmit(({ branchId }) => {
        onSubmit(branchId)
        onClose()
    })

    return <FormDialog onClose={onClose} onSubmit={handleSubmit_}>
        <div className={styles.title}>Merge</div>
        <hr />
        <select
            className={inputClass}
            style={{ height: '2.5rem' }}
            {...register('branchId', {
                required: 'Please select a branch',
            })}
        >
            <option value=''>Select a branch</option>
            {branches
                .filter(branch => branch.id != currentBranch.id)
                .map(branch => (
                    <option value={branch.id}>{branch.name}</option>
                ))
            }
        </select>
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </FormDialog>
}
