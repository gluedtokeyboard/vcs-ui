export const repoKeys = {
    all: ['repo'] as const,
    detail: (id: string) => [...repoKeys.all, id] as const,
}
