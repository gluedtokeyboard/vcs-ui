import Sidebar from '../../../../shared/components/Sidebar/Sidebar.tsx'
import ThemeProvider from '../../../../shared/providers/ThemeProvider.tsx'

export default function VcsSidebar() {
    const theme = {
        hoverBackground: '#e2e2e2',
        activeBackground: '#ccc',
    }
    return <ThemeProvider value={theme}>
        <Sidebar>
        </Sidebar>
    </ThemeProvider>
}
