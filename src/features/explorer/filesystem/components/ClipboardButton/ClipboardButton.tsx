import Button from '../../../components/buttons/Button/Button.tsx'
import useNodeIsSelected from '../../hooks/useNodeIsSelected.ts'
import { useFilesystemStore } from '../../stores/filesystemStore.ts'
import { type Node } from '../../types/directory.types.ts'
import { ClipboardOperationType } from '../../types/clipboard.types.ts'
import { getCurrentWorkingDirectory } from '../../utils.ts'
import { useClipboardStore } from '../../stores/clipboardStore.ts'

type ClipboardButtonProps = {
    icon?: string,
    text?: string,
    operation: ClipboardOperationType,
}

export default function ClipboardButton({ icon, text, operation }: ClipboardButtonProps) {
    const nodeIsSelected = useNodeIsSelected()
    const setClipboardContent = useClipboardStore.getState().setClipboardContent
    const clearSelection = useFilesystemStore.getState().clearSelection

    function handleClick() {
        const selectedNodeId = useFilesystemStore.getState().selectedNodeId as string
        const cwd = getCurrentWorkingDirectory()
        const selectedNode = cwd.contents.find(node => node.id == selectedNodeId) as Node
        setClipboardContent(selectedNode, cwd, operation)
        clearSelection()
    }

    return <Button icon={icon} text={text} onClick={handleClick} disabled={!nodeIsSelected} />
}
