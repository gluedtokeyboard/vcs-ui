import icon from './delete.svg'
import Button from '../../../components/buttons/Button/Button.tsx'
import { useFilesystemStore } from '../../stores/filesystemStore.ts'
import useDeleteNode from '../../hooks/useDeleteNode.ts'
import type { NodeType } from '../../types/directory.types.ts'
import useNodeIsSelected from '../../hooks/useNodeIsSelected.ts'

export default function Delete() {
    const nodeIsSelected = useNodeIsSelected()
    const deleteNode = useDeleteNode()

    function handleClick() {
        const nodeId = useFilesystemStore.getState().selectedNodeId as string
        const nodeType = useFilesystemStore.getState().selectedNodeType as NodeType
        deleteNode(nodeId, nodeType)
        useFilesystemStore.getState().clearSelection()
    }

    return <Button icon={icon} text='Delete' onClick={handleClick} disabled={!nodeIsSelected} />
}
