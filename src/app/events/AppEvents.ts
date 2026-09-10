import type { FilesystemEvents } from '../../features/filesystem/events/eventTypes.ts'
import type { VcsEvents } from '../../features/vcs/events/eventTypes.ts'

export type AppEvents =
    & FilesystemEvents
    & VcsEvents
