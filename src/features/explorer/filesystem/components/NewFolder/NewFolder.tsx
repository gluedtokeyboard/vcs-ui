import icon from './newFolder.svg'
import useCreateDirectory from '../../hooks/useCreateDirectory.ts'
import { NodeType } from '../../types/directory.types.ts'
import { joinToCwd } from '../../utils.ts'
import SingleInputDialogButton from '../../../../../shared/components/buttons/SingleInputDialogButton/SingleInputDialogButton.tsx'

export default function NewFolder() {
    const mutate = useCreateDirectory()

    function onSubmit(folderName: string) {
        const path = joinToCwd(folderName)
        mutate({
            path,
            // @ts-ignore
            type: NodeType.DIRECTORY,
        })
    }

    return <SingleInputDialogButton
        buttonProps={{
            icon,
            text: 'New Folder',
        }}
        dialogProps={{
            title: 'Create New Folder',
            inputPlaceholder: 'Enter the folder name',
            onSubmit,
        }}
    />
}
