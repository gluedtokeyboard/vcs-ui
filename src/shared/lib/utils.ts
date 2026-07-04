export function getBasename(path: string): string {
    return path.split('/').pop() as string
}
