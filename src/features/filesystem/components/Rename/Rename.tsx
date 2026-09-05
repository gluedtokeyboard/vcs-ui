import icon from './rename.svg'
import { useFilesystemStore } from '../../stores/filesystemStore.ts'
import type { NodeType } from '../../types/directory.types.ts'
import useNodeIsSelected from '../../hooks/useNodeIsSelected.ts'
import useRenameNode from '../../hooks/useRenameNode.ts'
import SingleInputDialogButton from '../../../../shared/components/buttons/SingleInputDialogButton/SingleInputDialogButton.tsx'

export default function Rename() {
    const nodeIsSelected = useNodeIsSelected()
    const renameNode = useRenameNode()

    function handleSubmit(relativePath: string) {
        const nodeId = useFilesystemStore.getState().selectedNodeId as string
        const nodeType = useFilesystemStore.getState().selectedNodeType as NodeType
        renameNode(nodeId, nodeType, relativePath)
    }

    return <SingleInputDialogButton
        buttonProps={{
            icon: icon,
            text: 'Rename',
            disabled: !nodeIsSelected,
        }}
        dialogProps={{
            title: 'Rename',
            inputPlaceholder: 'Enter the new name',
            onSubmit: handleSubmit,
        }}
    />
}
