import { getRelativePath } from '../filesystem/utils.ts'
import queryClient from '../../app/queryClient.ts'
import { repoKeys } from './queries/keys.ts'
import type { Repo } from './types/repo.types.ts'

export function getRepoRelativePath(path: string) {
    const repo = queryClient.getQueryData<Repo>(repoKeys.current())
    if (!repo) {
        throw Error('You are currently not inside a repository')
    }
    return getRelativePath(repo.repoRoot.path, path)
}
