import { useFilesystemStore } from '../stores/filesystemStore.ts'
import queryClient from '../../../app/queryClient.ts'
import type { Directory } from '../types/directory.types.ts'
import { directoryKeys } from './keys.ts'

export function getCwdQueryKey() {
    const cwdId = useFilesystemStore.getState().currentWorkingDirectory
    const root = queryClient.getQueryData<Directory>(directoryKeys.root())
    let queryKey
    if (root && cwdId == root.id) {
        queryKey = directoryKeys.root()
    } else {
        queryKey = directoryKeys.detail(cwdId)
    }
    return queryKey
}
