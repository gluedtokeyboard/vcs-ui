export const repoKeys = {
    all: ['repo'] as const,
    detail: (id: string) => [...repoKeys.all, id] as const,
    current: () => [...repoKeys.all, 'current'] as const,
}

export const statusKeys = {
    detail: (id: string) => [...repoKeys.detail(id), 'status'] as const,
}

export const logKeys = {
    detail: (repoId: string) => [...repoKeys.detail(repoId), 'log'] as const,
}

export const branchKeys = {
    all: (repoId: string) => [...repoKeys.detail(repoId), 'branches'] as const,
}
