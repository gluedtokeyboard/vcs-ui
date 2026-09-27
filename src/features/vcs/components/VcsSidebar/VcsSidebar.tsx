import Sidebar from '../../../../shared/components/Sidebar/Sidebar.tsx'
import ThemeProvider from '../../../../shared/providers/ThemeProvider.tsx'
import LogButton from '../Log/LogButton/LogButton.tsx'
import StatusPanel from '../Status/StatusPanel/StatusPanel.tsx'
import StatusButton from '../Status/StatusButton/StatusButton.tsx'

export default function VcsSidebar() {
    const theme = {
        hoverBackground: '#e2e2e2',
        activeBackground: '#ccc',
    }
    return <ThemeProvider value={theme}>
        <Sidebar InitialPanel={StatusPanel}>
            <StatusButton />
            <LogButton />
        </Sidebar>
    </ThemeProvider>
}
