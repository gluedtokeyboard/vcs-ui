export type Branch = {
    id: string,
    repoId: string,
    name: string
}

export type BranchData = {
    currentBranch: Branch,
    branches: Branch[],
}
