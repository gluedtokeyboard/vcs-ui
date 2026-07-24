import icon from './newFile.svg'
import useCreateFile from '../../hooks/useCreateFile.ts'
import { NodeType } from '../../types/directory.types.ts'
import { joinToCwd } from '../../utils.ts'
import SingleInputDialogButton from '../../../components/buttons/SingleInputDialogButton/SingleInputDialogButton.tsx'

export default function NewFile() {
    const mutate = useCreateFile()

    function onSubmit(fileName: string) {
        const path = joinToCwd(fileName)
        mutate({
            path,
            // @ts-ignore
            type: NodeType.FILE,
        })
    }

    return <SingleInputDialogButton
        buttonProps={{
            icon,
            text: 'New File',
        }}
        dialogProps={{
            title: 'Create New File',
            inputPlaceholder: 'Enter the file name',
            onSubmit,
        }}
    />
}
