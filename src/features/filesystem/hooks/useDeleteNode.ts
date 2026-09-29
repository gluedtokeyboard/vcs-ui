import useOptimisticDelete from '../../../shared/hooks/useOptimisticDelete.ts'
import { NodeType } from '../types/directory.types.ts'
import { deleteDirectory } from '../api/directories.ts'
import { deleteFile } from '../api/files.ts'
import { directoryKeys, fileKeys } from '../queries/keys.ts'
import { getCwdQueryKey } from '../queries/helpers.ts'
import { FilesystemEvent } from '../events/eventTypes.ts'

export default function useDeleteNode() {
    const optimisticDeleteFunctionCommonArgs = {
        queryKeyAllFn: getCwdQueryKey,
        allDataAttribute: 'contents',
    }
    const optimisticDeleteFunctions = {
        [NodeType.DIRECTORY]: useOptimisticDelete({
            deleteFn: deleteDirectory,
            queryKeyDetailFn: directoryKeys.detail,
            ...optimisticDeleteFunctionCommonArgs,
            emitEventOnSuccess: FilesystemEvent.DIRECTORY_DELETED,
        }),
        [NodeType.FILE]: useOptimisticDelete({
            deleteFn: deleteFile,
            queryKeyDetailFn: fileKeys.detail,
            ...optimisticDeleteFunctionCommonArgs,
            emitEventOnSuccess: FilesystemEvent.FILE_DELETED,
        }),
    }

    function deleteNode(nodeId: string, nodeType: NodeType) {
        optimisticDeleteFunctions[nodeType](nodeId)
    }

    return deleteNode
}
