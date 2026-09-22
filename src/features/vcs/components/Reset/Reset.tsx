import SingleInputDialogButton
    from '../../../../shared/components/buttons/SingleInputDialogButton/SingleInputDialogButton.tsx'
import { useCurrentRepo } from '../../hooks/useCurrentRepo.ts'
import useReset from '../../hooks/useReset.ts'
import icon from './reset.svg'

export default function Reset() {
    const repo = useCurrentRepo().data
    const reset = useReset()

    function handleSubmit(commitPrefix: string) {
        const repoId = repo!.id
        reset.mutate({
            repoId,
            commitPrefix,
        })
    }

    return <SingleInputDialogButton
        buttonProps={{
            icon,
            text: 'Reset',
            disabled: !repo,
        }}
        dialogProps={{
            title: 'Reset',
            inputPlaceholder: 'Enter a commit prefix',
            registerOptions: {
                required: 'Please provide a commit prefix.',
            },
            onSubmit: handleSubmit,
        }}
    />
}
