import { eventBus } from '../../../../app/events'
import queryClient from '../../../../app/queryClient.ts'
import { repoKeys, statusKeys } from '../../queries/keys.ts'
import type { AppEvents } from '../../../../app/events/AppEvents.ts'
import type { Repo } from '../../types/repo.types'
import { FilesystemEvent } from '../../../filesystem/events/eventTypes.ts'
import { VcsEvent } from '../eventTypes.ts'

const invalidateStatusEvents = [
    FilesystemEvent.DIRECTORY_CREATED,
    FilesystemEvent.FILE_CREATED,
    FilesystemEvent.FILE_UPDATED,
    FilesystemEvent.DIRECTORY_RENAMED,
    FilesystemEvent.FILE_RENAMED,
    FilesystemEvent.DIRECTORY_DELETED,
    FilesystemEvent.FILE_DELETED,
    FilesystemEvent.DIRECTORY_CUT,
    FilesystemEvent.FILE_CUT,
    FilesystemEvent.DIRECTORY_COPIED,
    FilesystemEvent.FILE_COPIED,
    VcsEvent.STAGING_ADD,
    VcsEvent.STAGING_RM,
    VcsEvent.COMMIT,
    VcsEvent.CHECKOUT_FILE,
] as const

type Payload = AppEvents[typeof invalidateStatusEvents[number]]

function invalidateStatus(_payload: Payload) {
    const currentRepo = queryClient.getQueryData<Repo>(repoKeys.current())
    const currentRepoId = currentRepo?.id
    if (currentRepoId) {
        const queryKey = statusKeys.detail(currentRepoId)
        queryClient.invalidateQueries({ queryKey })
    }
}

invalidateStatusEvents.forEach((event) => eventBus.subscribe(event, invalidateStatus))
