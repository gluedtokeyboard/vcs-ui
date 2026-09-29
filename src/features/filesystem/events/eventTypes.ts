import type { Directory, Node } from '../types/directory.types.ts'
import type { File } from '../types/file.types.ts'

export const FilesystemEvent = {
    DIRECTORY_CHANGED: 'directory:changed',
    DIRECTORY_CREATED: 'directory:created',
    FILE_CREATED: 'file:created',
    DIRECTORY_CUT: 'directory:cut',
    FILE_CUT: 'file:cut',
    DIRECTORY_COPIED: 'directory:copied',
    FILE_COPIED: 'file:copied',
    DIRECTORY_DELETED: 'directory:deleted',
    FILE_DELETED: 'file:deleted',
    DIRECTORY_RENAMED: 'directory:renamed',
    FILE_RENAMED: 'file:renamed',
    FILE_UPDATED: 'file:updated',
} as const

export type FilesystemEvents = {
    [FilesystemEvent.DIRECTORY_CHANGED]: Directory,
    [FilesystemEvent.DIRECTORY_CREATED]: Node,
    [FilesystemEvent.FILE_CREATED]: Node,
    [FilesystemEvent.DIRECTORY_CUT]: Directory,
    [FilesystemEvent.FILE_CUT]: File,
    [FilesystemEvent.DIRECTORY_COPIED]: Node,
    [FilesystemEvent.FILE_COPIED]: Node,
    [FilesystemEvent.DIRECTORY_DELETED]: void,
    [FilesystemEvent.FILE_DELETED]: void,
    [FilesystemEvent.DIRECTORY_RENAMED]: Directory,
    [FilesystemEvent.FILE_RENAMED]: File,
    [FilesystemEvent.FILE_UPDATED]: File,
}
