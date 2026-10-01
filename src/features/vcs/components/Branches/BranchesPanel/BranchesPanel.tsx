import SidebarPanel from '../../../../../shared/components/SidebarPanel/SidebarPanel.tsx'
import { useCurrentRepo } from '../../../hooks/useCurrentRepo.ts'
import NotARepositoryPanel from '../../NotARepositoryPanel/NotARepositoryPanel.tsx'
import useBranches from '../../../hooks/useBranches.ts'
import type { BranchData } from '../../../types/branch.types.ts'
import UnorderedList from '../../../../../shared/components/UnorderedList/UnorderedList.tsx'
import CreateBranch from '../CreateBranch/CreateBranch.tsx'
import { stringComparator } from '../../../../../shared/lib/utils.ts'
import Branch from '../Branch/Branch.tsx'

export default function BranchesPanel() {
    const repo = useCurrentRepo().data
    const branchData = useBranches(repo?.id)?.data
    if (!branchData) {
        return <NotARepositoryPanel />
    } else {
        return <BranchesContent branchData={branchData} />
    }
}

function BranchesContent({ branchData }: { branchData: BranchData }) {
    return <SidebarPanel title='Branches'>
        <CreateBranch />
        <Branches branchData={branchData} />
    </SidebarPanel>
}


function Branches({ branchData: { currentBranch, branches } }: { branchData: BranchData }) {
    branches = branches.sort((branch1, branch2) => (
        stringComparator.compare(branch1.name, branch2.name)
    ))
    return <UnorderedList gap='0.75rem'>
        {branches.map(branch => (
            <Branch
                branch={branch}
                isCurrentBranch={branch.id == currentBranch.id}
            />
        ))}
    </UnorderedList>
}
