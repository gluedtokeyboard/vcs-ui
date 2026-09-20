import { use } from 'react'
import ThemeContext from '../contexts/ThemeContext.ts'

export default function useTheme() {
    return use(ThemeContext)
}
