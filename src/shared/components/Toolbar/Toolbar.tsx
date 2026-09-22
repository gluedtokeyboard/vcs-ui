import type { ReactNode } from 'react'
import styles from './Toolbar.module.css'
import * as React from 'react'
import useTheme from '../../hooks/useTheme.ts'
import ThemeProvider from '../../providers/ThemeProvider.tsx'

export default function Toolbar({ children }: { children?: ReactNode }) {
    const theme = useTheme()?.theme
    const style = {
        '--background-color': theme?.backgroundColor,
    } as React.CSSProperties
    return <div className={styles.toolbar} style={style}>
        <ThemeProvider
                value={{
                    ...theme,
                    backgroundColor: 'transparent',
                }}
        >
            { children }
        </ThemeProvider>
    </div>
}
