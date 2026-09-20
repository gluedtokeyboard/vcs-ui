import * as React from 'react'
import ThemeContext, { type Theme } from '../contexts/ThemeContext.ts'
import { useState } from 'react'

type ThemeProviderProps = React.PropsWithChildren<{
    value: Theme,
}>

export default function ThemeProvider({ value, children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(value)
    const contextValue = {
        theme,
        setTheme,
    }
    return <ThemeContext value={contextValue}>
        {children}
    </ThemeContext>
}
