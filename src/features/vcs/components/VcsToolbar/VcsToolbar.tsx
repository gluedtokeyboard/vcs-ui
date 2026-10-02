import Toolbar from '../../../../shared/components/Toolbar/Toolbar.tsx'
import ThemeProvider from '../../../../shared/providers/ThemeProvider.tsx'
import Init from '../Init/Init.tsx'
import Add from '../Add/Add.tsx'
import Rm from '../Rm/Rm.tsx'
import Commit from '../Commit/Commit.tsx'
import Reset from '../Reset/Reset.tsx'
import CheckoutFile from '../CheckoutFile/CheckoutFile.tsx'
import Merge from '../Merge/Merge.tsx'

export default function VcsToolbar() {
    const theme = {
        color: 'black',
        backgroundColor: '#cbcbcb',
        hoverBackground: '#e8e8e8',
        activeBackground: '#f4f4f4',
    }
    return <ThemeProvider value={theme}>
        <Toolbar>
            <Init />
            <Add />
            <Rm />
            <Commit />
            <CheckoutFile />
            <Reset />
            <Merge />
        </Toolbar>
    </ThemeProvider>
}
