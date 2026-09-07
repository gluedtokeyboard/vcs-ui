import Toolbar from '../../../../shared/components/Toolbar/Toolbar.tsx'
import ThemeProvider from '../../../../shared/providers/ThemeProvider.tsx'

export default function VcsToolbar() {
    const theme = {
        color: 'black',
        backgroundColor: '#cbcbcb',
        hoverBackground: '#e8e8e8',
        activeBackground: '#f4f4f4',
    }
    return <ThemeProvider value={theme}>
        <Toolbar>
        </Toolbar>
    </ThemeProvider>
}
