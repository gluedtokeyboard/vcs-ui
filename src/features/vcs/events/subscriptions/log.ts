import { eventBus } from '../../../../app/events'
import { VcsEvent } from '../eventTypes.ts'
import queryClient from '../../../../app/queryClient.ts'
import { logKeys, repoKeys } from '../../queries/keys.ts'
import type { AppEvents } from '../../../../app/events/AppEvents.ts'
import type { Repo } from '../../types/repo.types'

const invalidateLogEvents = [
    VcsEvent.COMMIT,
    VcsEvent.RESET,
] as const

type Payload = AppEvents[typeof invalidateLogEvents[number]]

function invalidateLog(_payload: Payload) {
    const currentRepo = queryClient.getQueryData<Repo>(repoKeys.current())
    const currentRepoId = currentRepo?.id
    if (currentRepoId) {
        const queryKey = logKeys.detail(currentRepoId)
        queryClient.invalidateQueries({ queryKey })
    }
}

invalidateLogEvents.forEach((event) => eventBus.subscribe(event, invalidateLog))
