import { NodeType } from '../types/directory.types.ts'
import { updateDirectoryPath } from '../api/directories.ts'
import { updateFilePath } from '../api/files.ts'
import { directoryKeys, fileKeys } from '../queries/keys.ts'
import { getCwdQueryKey } from '../queries/helpers.ts'
import useOptimisticUpdate from './useOptimisticUpdate.ts'
import { joinToCwd } from '../utils.ts'

export default function useRenameNode() {
    const queryKeyAllFn = getCwdQueryKey
    const allDataAttribute = 'contents'
    const optimisticUpdateFunctions = {
        [NodeType.DIRECTORY]: useOptimisticUpdate(
            updateDirectoryPath, directoryKeys.detail, queryKeyAllFn, allDataAttribute),
        [NodeType.FILE]: useOptimisticUpdate(updateFilePath, fileKeys.detail, queryKeyAllFn, allDataAttribute),
    }

    function renameNode(nodeId: string, nodeType: NodeType, relativePath: string) {
        const path = joinToCwd(relativePath)
        const node = {
            id: nodeId,
            path,
        }
        optimisticUpdateFunctions[nodeType](node)
    }

    return renameNode
}
