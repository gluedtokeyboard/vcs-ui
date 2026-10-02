import { eventBus } from '../../../../app/events'
import { VcsEvent } from '../../../vcs/events/eventTypes.ts'
import queryClient from '../../../../app/queryClient.ts'
import type { AppEvents } from '../../../../app/events/AppEvents.ts'
import { fileKeys } from '../../queries/keys.ts'

const invalidateFileEvents = [
    VcsEvent.RESET,
    VcsEvent.CHECKOUT_FILE,
    VcsEvent.CHECKOUT_BRANCH,
    VcsEvent.MERGE_SUCCESS,
    VcsEvent.MERGE_FAILURE,
] as const

type Payload = AppEvents[typeof invalidateFileEvents[number]]

function removeFileQueries(_payload: Payload) {
    queryClient.removeQueries({ queryKey: fileKeys.all })
}

invalidateFileEvents.forEach((event) => eventBus.subscribe(event, removeFileQueries))
