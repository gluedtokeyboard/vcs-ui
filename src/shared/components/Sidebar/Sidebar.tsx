import { type PropsWithChildren } from 'react'
import styles from './Sidebar.module.css'
import SidebarContext from '../../contexts/SidebarContext.ts'
import useFunction from '../../hooks/useFunction.ts'
import type { ComponentFunction } from '../../types/general.types.ts'

type SidebarProps = PropsWithChildren<{
    InitialPanel?: ComponentFunction,
}>
type SidebarContentProps = PropsWithChildren<{}>
type SidebarButtonRailProps = PropsWithChildren<{}>

export default function Sidebar({ InitialPanel, children }: SidebarProps) {
    const [Content, setContent] = useFunction(InitialPanel)
    return <div className={styles.sidebar}>
        <SidebarContent>
            {Content && <Content />}
        </SidebarContent>
        <SidebarButtonRail>
            <SidebarContext value={{ setContent }}>
                {children}
            </SidebarContext>
        </SidebarButtonRail>
    </div>
}

function SidebarContent({ children }: SidebarContentProps) {
    return <div className={styles.sidebarContent}>
        <div className={styles.sidebarPanelWrapper}>
            {children}
        </div>
    </div>
}

function SidebarButtonRail({ children }: SidebarButtonRailProps) {
    return <div className={styles.sidebarButtonRail}>
        {children}
    </div>
}
