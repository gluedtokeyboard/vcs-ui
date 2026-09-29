import { NodeType } from '../types/directory.types.ts'
import { updateDirectoryPath } from '../api/directories.ts'
import { updateFilePath } from '../api/files.ts'
import { directoryKeys, fileKeys } from '../queries/keys.ts'
import { getCwdQueryKey } from '../queries/helpers.ts'
import useOptimisticUpdate from '../../../shared/hooks/useOptimisticUpdate.ts'
import { joinToCwd } from '../utils.ts'
import { FilesystemEvent } from '../events/eventTypes.ts'

export default function useRenameNode() {
    const optimisticUpdateFunctionCommonArgs = {
        queryKeyAllFn: getCwdQueryKey,
        allDataAttribute: 'contents',
    }
    const optimisticUpdateFunctions = {
        [NodeType.DIRECTORY]: useOptimisticUpdate({
            updateFn: updateDirectoryPath,
            queryKeyDetailFn: directoryKeys.detail,
            ...optimisticUpdateFunctionCommonArgs,
            emitEventOnSuccess: FilesystemEvent.DIRECTORY_RENAMED,
        }),
        [NodeType.FILE]: useOptimisticUpdate({
            updateFn: updateFilePath,
            queryKeyDetailFn: fileKeys.detail,
            ...optimisticUpdateFunctionCommonArgs,
            emitEventOnSuccess: FilesystemEvent.FILE_RENAMED,
        }),
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
