import { eventBus } from '../../../../app/events'
import { VcsEvent } from '../eventTypes.ts'
import queryClient from '../../../../app/queryClient.ts'
import { branchKeys, repoKeys } from '../../queries/keys.ts'
import type { AppEvents } from '../../../../app/events/AppEvents.ts'
import type { Repo } from '../../types/repo.types'

const invalidateBranchesEvents = [
    VcsEvent.BRANCH_CREATED,
    VcsEvent.BRANCH_DELETED,
    VcsEvent.CHECKOUT_BRANCH,
] as const

type Payload = AppEvents[typeof invalidateBranchesEvents[number]]

function invalidateBranches(_payload: Payload) {
    const currentRepo = queryClient.getQueryData<Repo>(repoKeys.current())
    const currentRepoId = currentRepo?.id
    if (currentRepoId) {
        const queryKey = branchKeys.all(currentRepoId)
        queryClient.invalidateQueries({ queryKey })
    }
}

invalidateBranchesEvents.forEach((event) => eventBus.subscribe(event, invalidateBranches))
