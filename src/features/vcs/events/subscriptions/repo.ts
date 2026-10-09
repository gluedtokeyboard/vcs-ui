import { eventBus } from '../../../../app/events'
import { VcsEvent } from '../eventTypes.ts'
import queryClient from '../../../../app/queryClient.ts'
import { repoKeys } from '../../queries/keys.ts'
import { FilesystemEvent } from '../../../filesystem/events/eventTypes.ts'
import type { AppEvents } from '../../../../app/events/AppEvents.ts'

const invalidateCurrentRepoEvents = [
    VcsEvent.REPO_INIT,
    FilesystemEvent.DIRECTORY_CHANGED,
    FilesystemEvent.DIRECTORY_CUT,
    FilesystemEvent.DIRECTORY_COPIED,
    FilesystemEvent.DIRECTORY_DELETED,
    FilesystemEvent.DIRECTORY_RENAMED,
] as const

type Payload = AppEvents[typeof invalidateCurrentRepoEvents[number]]

function invalidateCurrentRepo(_payload: Payload) {
    queryClient.invalidateQueries({ queryKey: repoKeys.current() })
}

invalidateCurrentRepoEvents.forEach((event) => eventBus.subscribe(event, invalidateCurrentRepo))
