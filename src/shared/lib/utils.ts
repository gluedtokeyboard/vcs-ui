export function getBasename(path: string): string {
    return path.split('/').pop() as string
}

export function joinPath(base: string, ...others: string[]): string {
    for (let other of others) {
        const baseTrailingSlash = base.endsWith('/')
        const otherLeadingSlash = other.startsWith('/')
        if (baseTrailingSlash != otherLeadingSlash) {
            base += other
        } else if (!(baseTrailingSlash || otherLeadingSlash)) {
            base += `/${other}`
        } else {
            base += other.substring(1)
        }
    }
    return base
}

export const stringComparator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
})
