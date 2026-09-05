import useOptimisticDelete from '../../../shared/hooks/useOptimisticDelete.ts'
import useOptimisticAdd from '../../../shared/hooks/useOptimisticAdd.ts'
import { type Directory, type Node, NodeType } from '../types/directory.types.ts'
import { directoryKeys, fileKeys } from '../queries/keys.ts'
import { getBasename, joinPath } from '../../../shared/lib/utils.ts'
import { useClipboardStore } from '../stores/clipboardStore.ts'
import { updateDirectoryPath } from '../api/directories.ts'
import { updateFilePath } from '../api/files.ts'
import useDeferredValue from '../../../shared/hooks/useDeferredValue.ts'

export default function useCut() {
    const keys = {
        [NodeType.DIRECTORY]: directoryKeys,
        [NodeType.FILE]: fileKeys,
    }
    const updatePathFn = {
        [NodeType.DIRECTORY]: updateDirectoryPath,
        [NodeType.FILE]: updateFilePath,
    }
    const detailKey = useDeferredValue<readonly string[]>()
    const sourceKey = useDeferredValue<readonly string[]>()
    const destinationDirectoryKey = useDeferredValue<readonly string[]>()
    const promiseRef = useDeferredValue<Promise<any>>()
    const allDataAttribute = 'contents'
    const deleteFn = useOptimisticDelete(
        promiseRef.get,
        detailKey.get,
        sourceKey.get,
        allDataAttribute,
    )
    const addFn = useOptimisticAdd(
        promiseRef.get,
        undefined,
        destinationDirectoryKey.get,
        allDataAttribute,
    )

    function cut(source: Node, destinationDirectoryPath: string, destinationDirectoryQueryKey: readonly string[]) {
        const clipboardContentType = (useClipboardStore.getState().clipboardNode as Node).type
        detailKey.set(keys[clipboardContentType].detail(source.id))
        const sourceDirectory = useClipboardStore.getState().clipboardSourceDirectory as Directory
        sourceKey.set(directoryKeys.detail(sourceDirectory.id))
        destinationDirectoryKey.set(destinationDirectoryQueryKey)
        const basename = getBasename(source.path)
        const newPath = joinPath(destinationDirectoryPath, basename)
        const updatedItem = {
            ...source,
            path: newPath,
        }
        const promise = updatePathFn[clipboardContentType](updatedItem)
        promiseRef.set(promise)
        deleteFn(source.id)
        addFn(updatedItem)
    }

    return cut
}
