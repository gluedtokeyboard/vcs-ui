import SidebarButton from '../../../../../shared/components/buttons/SidebarButton/SidebarButton.tsx'
import StatusPanel from '../StatusPanel/StatusPanel.tsx'
import icon from './status.svg'

export default function StatusButton() {
    return <SidebarButton icon={icon} text='Status' ContentComponent={StatusPanel} />
}