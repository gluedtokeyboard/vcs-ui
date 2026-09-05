import useOptimisticDelete from '../../../shared/hooks/useOptimisticDelete.ts'
import { NodeType } from '../types/directory.types.ts'
import { deleteDirectory } from '../api/directories.ts'
import { deleteFile } from '../api/files.ts'
import { directoryKeys, fileKeys } from '../queries/keys.ts'
import { getCwdQueryKey } from '../queries/helpers.ts'

export default function useDeleteNode() {
    const queryKeyAllFn = getCwdQueryKey
    const allDataAttribute = 'contents'
    const optimisticDeleteFunctions = {
        [NodeType.DIRECTORY]: useOptimisticDelete(
            deleteDirectory, directoryKeys.detail, queryKeyAllFn, allDataAttribute),
        [NodeType.FILE]: useOptimisticDelete(deleteFile, fileKeys.detail, queryKeyAllFn, allDataAttribute),
    }

    function deleteNode(nodeId: string, nodeType: NodeType) {
        optimisticDeleteFunctions[nodeType](nodeId)
    }

    return deleteNode
}
