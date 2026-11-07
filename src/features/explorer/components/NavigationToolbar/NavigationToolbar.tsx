import Toolbar from '../../../../shared/components/Toolbar/Toolbar.tsx'
import Back from '../Back/Back.tsx'
import Home from '../Home/Home.tsx'
import ThemeProvider from '../../../../shared/providers/ThemeProvider.tsx'

export default function NavigationToolbar() {
    const theme = {
        color: 'black',
        backgroundColor: '#efefef',
        hoverBackground: '#cecece',
        activeBackground: '#bbb',
    }
    return <ThemeProvider value={theme}>
        <Toolbar>
            <Back />
            <Home />
        </Toolbar>
    </ThemeProvider>
}
