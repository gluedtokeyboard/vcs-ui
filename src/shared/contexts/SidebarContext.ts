import { createContext } from 'react'
import type { ComponentFunction } from '../types/general.types.ts'

type SidebarContextValue = {
    setContent: (component: ComponentFunction | null) => void
}

export default createContext<SidebarContextValue | null>(null)
