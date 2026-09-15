import SidebarContext from '../contexts/SidebarContext.ts'
import { use } from 'react'

export default function useSidebar() {
    return use(SidebarContext)
}
