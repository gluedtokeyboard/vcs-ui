import type { Directory } from '../types/directory.types.ts'

export const FilesystemEvent = {
    DIRECTORY_CHANGED: 'directory:changed',
} as const

export type FilesystemEvents = {
    [FilesystemEvent.DIRECTORY_CHANGED]: Directory,
}
