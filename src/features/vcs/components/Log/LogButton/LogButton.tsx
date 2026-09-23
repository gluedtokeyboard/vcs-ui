import SidebarButton from '../../../../../shared/components/buttons/SidebarButton/SidebarButton.tsx'
import LogPanel from '../LogPanel/LogPanel.tsx'
import icon from './log.svg'

export default function LogButton() {
    return <SidebarButton icon={icon} text='Log' ContentComponent={LogPanel} />
}
