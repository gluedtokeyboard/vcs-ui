import { createContext } from 'react'

export type Theme = {
    color?: string,
    backgroundColor?: string,
    hoverBackground?: string,
    activeBackground?: string,
}

export type ThemeContextType = {
    theme: Theme,
    setTheme: (theme: Theme) => void,
}

export default createContext<ThemeContextType | null>(null)
