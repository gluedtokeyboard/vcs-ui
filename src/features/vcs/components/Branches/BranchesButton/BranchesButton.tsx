import SidebarButton from '../../../../../shared/components/buttons/SidebarButton/SidebarButton.tsx'
import BranchesPanel from '../BranchesPanel/BranchesPanel.tsx'
import icon from './branches.svg'

export default function BranchesButton() {
    return <SidebarButton icon={icon} text='Branches' ContentComponent={BranchesPanel} />
}
