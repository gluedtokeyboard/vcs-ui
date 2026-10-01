import useCreateBranch from '../../../hooks/useCreateBranch.ts'
import ThemeProvider from '../../../../../shared/providers/ThemeProvider.tsx'
import SingleInputDialogButton
    from '../../../../../shared/components/buttons/SingleInputDialogButton/SingleInputDialogButton.tsx'
import icon from './createBranch.svg'
import { useCurrentRepo } from '../../../hooks/useCurrentRepo.ts'

export default function CreateBranch() {
    const repo = useCurrentRepo().data
    const createBranch = useCreateBranch()
    const theme = {
        backgroundColor: '#e0e0e0',
        hoverBackground: '#cacaca',
        activeBackground: '#b2b2b2',
    }

    function handleSubmit(branchName: string) {
        createBranch.mutate({
            repoId: repo!.id,
            branchName,
        })
    }

    return <ThemeProvider value={theme}>
        <SingleInputDialogButton
            buttonProps={{
                icon,
                text: 'Create Branch',
                disabled: !repo,
            }}
            dialogProps={{
                title: 'Create New Branch',
                inputPlaceholder: 'Enter a branch name',
                onSubmit: handleSubmit,
                registerOptions: {
                    required: 'Please provide a branch name.',
                },
            }}
        />
    </ThemeProvider>
}
