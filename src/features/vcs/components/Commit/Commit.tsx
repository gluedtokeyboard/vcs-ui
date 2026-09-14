import SingleInputDialogButton
    from '../../../../shared/components/buttons/SingleInputDialogButton/SingleInputDialogButton.tsx'
import icon from './commit.svg'
import { useCommit } from '../../hooks/useCommit.ts'
import { useCurrentRepo } from '../../hooks/useCurrentRepo.ts'

export default function Commit() {
    const repo = useCurrentRepo().data
    const commit = useCommit()

    function handleSubmit(message: string) {
        commit.mutate({
            repoId: repo!.id,
            message,
        })
    }

    return <SingleInputDialogButton
        buttonProps={{
            icon,
            text: 'Commit',
            disabled: !repo,
        }}
        dialogProps={{
            title: 'Commit',
            inputPlaceholder: 'Enter a commit message',
            onSubmit: handleSubmit,
            registerOptions: {
                required: 'Please provide a commit message.',
            }
        }}
    />
}
