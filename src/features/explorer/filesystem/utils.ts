import { useFilesystemStore } from './stores/filesystemStore.ts'
import queryClient from '../../../app/queryClient.ts'
import type { Directory } from './types/directory.types.ts'
import { directoryKeys } from './queries/keys.ts'

export function getCurrentWorkingDirectory(): Directory {
    const cwdId = useFilesystemStore.getState().currentWorkingDirectory
    return queryClient.getQueryData<Directory>(directoryKeys.detail(cwdId)) as Directory
}
