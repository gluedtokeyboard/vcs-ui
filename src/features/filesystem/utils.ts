import { useFilesystemStore } from './stores/filesystemStore.ts'
import queryClient from '../../app/queryClient.ts'
import type { Directory } from './types/directory.types.ts'
import { directoryKeys } from './queries/keys.ts'
import { joinPath } from '../../shared/lib/utils.ts'

export function getCurrentWorkingDirectory(): Directory {
    const cwdId = useFilesystemStore.getState().currentWorkingDirectory
    return queryClient.getQueryData<Directory>(directoryKeys.detail(cwdId)) as Directory
}

export function joinToCwd(path: string): string {
    const { path: cwdPath } = getCurrentWorkingDirectory()
    return joinPath(cwdPath, path)
}
