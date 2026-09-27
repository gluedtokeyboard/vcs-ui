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

export function getRelativePath(basePath: string, path: string) {
    if (!path.startsWith(basePath)) {
        throw Error(`Path ${path} does not start with the given base path ${basePath}`)
    }
    let startIndex = basePath.length
    if (!basePath.endsWith('/')) {
        startIndex += 1
    }
    return path.substring(startIndex)
}
