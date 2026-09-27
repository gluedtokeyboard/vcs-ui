import styles from './SidebarPanel.module.css'
import type { PropsWithChildren } from 'react'

type SidebarPanelProps = PropsWithChildren<{
    title: string,
}>

export default function SidebarPanel({ title, children }: SidebarPanelProps) {
    return <div className={styles.panel}>
        <h2 className={styles.h2}>{title}</h2>
        <hr />
        <div className={styles.contents}>
            {children}
        </div>
    </div>
}
