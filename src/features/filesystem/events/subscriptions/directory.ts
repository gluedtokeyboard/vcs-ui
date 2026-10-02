import { eventBus } from '../../../../app/events'
import { VcsEvent } from '../../../vcs/events/eventTypes.ts'
import queryClient from '../../../../app/queryClient.ts'
import { getCwdQueryKey } from '../../queries/helpers.ts'
import type { AppEvents } from '../../../../app/events/AppEvents.ts'

const invalidateCwdEvents = [
    VcsEvent.REPO_INIT,
    VcsEvent.STAGING_RM,
    VcsEvent.RESET,
    VcsEvent.CHECKOUT_FILE,
    VcsEvent.CHECKOUT_BRANCH,
    VcsEvent.MERGE_SUCCESS,
    VcsEvent.MERGE_FAILURE,
] as const

type Payload = AppEvents[typeof invalidateCwdEvents[number]]

function invalidateCwd(_payload: Payload) {
    queryClient.invalidateQueries({ queryKey: getCwdQueryKey() })
}

invalidateCwdEvents.forEach((event) => eventBus.subscribe(event, invalidateCwd))
