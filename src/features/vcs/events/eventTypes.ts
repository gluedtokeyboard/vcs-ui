import type { Repo } from '../types/repo.types.ts'
import type { StagingEntry } from '../types/staging.types.ts'
import type { Commit } from '../types/commit.types.ts'
import type { Branch } from '../types/branch.types.ts'
import type { ErrorResponse } from '../../../shared/types/api.types.ts'

export const VcsEvent = {
    REPO_INIT: 'repo:init',
    STAGING_ADD: 'staging:add',
    STAGING_RM: 'staging:rm',
    COMMIT: 'commit',
    RESET: 'reset',
    CHECKOUT_FILE: 'checkout:file',
    BRANCH_CREATED: 'branch:created',
    BRANCH_DELETED: 'branch:deleted',
    CHECKOUT_BRANCH: 'checkout:branch',
    MERGE_SUCCESS: 'merge:success',
    MERGE_FAILURE: 'merge:failure',
} as const

export type VcsEvents = {
    [VcsEvent.REPO_INIT]: Repo
    [VcsEvent.STAGING_ADD]: StagingEntry,
    [VcsEvent.STAGING_RM]: StagingEntry,
    [VcsEvent.COMMIT]: Commit,
    [VcsEvent.RESET]: void,
    [VcsEvent.CHECKOUT_FILE]: void,
    [VcsEvent.BRANCH_CREATED]: Branch,
    [VcsEvent.BRANCH_DELETED]: void,
    [VcsEvent.CHECKOUT_BRANCH]: void,
    [VcsEvent.MERGE_SUCCESS]: Commit,
    [VcsEvent.MERGE_FAILURE]: ErrorResponse,
}
