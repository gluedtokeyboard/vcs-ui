import useOptimisticAdd from '../../../../shared/hooks/useOptimisticAdd.ts'
import { type Directory, type Node, NodeType } from '../types/directory.types.ts'
import { getBasename, joinPath } from '../../../../shared/lib/utils.ts'
import { useClipboardStore } from '../stores/clipboardStore.ts'
import { copyDirectory } from '../api/directories.ts'
import { copyFile } from '../api/files.ts'
import useDeferredValue from '../../../../shared/hooks/useDeferredValue.ts'
import queryClient from '../../../../app/queryClient.ts'

export default function useCopy() {
    const copyFn = {
        [NodeType.DIRECTORY]: copyDirectory,
        [NodeType.FILE]: copyFile,
    }
    const destinationKey = useDeferredValue<readonly string[]>()
    const promiseRef = useDeferredValue<Promise<any>>()
    const addFn = useOptimisticAdd(
        promiseRef.get,
        undefined,
        destinationKey.get,
        'contents'
    )

    function copy(source: Node, destinationDirectoryPath: string, destinationDirectoryQueryKey: readonly string[]) {
        const clipboardContentType = (useClipboardStore.getState().clipboardNode as Node).type
        destinationKey.set(destinationDirectoryQueryKey)
        const basename = getBasename(source.path)
        const destinationDirectoryContents = new Set(
            (queryClient.getQueryData<Directory>(destinationDirectoryQueryKey) as Directory)
                .contents
                .map(node => getBasename(node.path))
        )
        let newBasename = basename
        let nodeSuffix = 2
        while (destinationDirectoryContents.has(newBasename)) {
            newBasename = `${basename} (${nodeSuffix})`
            nodeSuffix += 1
        }
        const newPath = joinPath(destinationDirectoryPath, newBasename)
        const copyFnArgs = {
            sourceId: source.id,
            destination: newPath,
        }
        const promise = copyFn[clipboardContentType](copyFnArgs)
        promiseRef.set(promise)
        const newNode = {
            path: newPath,
            type: clipboardContentType,
        }
        addFn(newNode)
    }

    return copy
}
