import type { Repo } from '../types/repo.types.ts'

export const VcsEvent = {
    REPO_INIT: 'repo:init',
} as const

export type VcsEvents = {
    [VcsEvent.REPO_INIT]: Repo
}
