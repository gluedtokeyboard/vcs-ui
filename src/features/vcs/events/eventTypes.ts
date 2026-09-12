import type { Repo } from '../types/repo.types.ts'
import type { StagingEntry } from '../types/staging.types.ts'

export const VcsEvent = {
    REPO_INIT: 'repo:init',
    STAGING_ADD: 'staging:add',
    STAGING_RM: 'staging:rm',
} as const

export type VcsEvents = {
    [VcsEvent.REPO_INIT]: Repo
    [VcsEvent.STAGING_ADD]: StagingEntry,
    [VcsEvent.STAGING_RM]: StagingEntry,
}
