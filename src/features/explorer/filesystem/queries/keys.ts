export const directoryKeys = {
    all: ['directories'] as const,
    detail: (id: string) => [...directoryKeys.all, id] as const,
    root: () => [...directoryKeys.all, 'root'] as const,
}
