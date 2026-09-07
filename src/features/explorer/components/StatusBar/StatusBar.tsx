import { useStatusBarStore } from '../../stores/statusBarStore.ts'
import styles from './StatusBar.module.css'

export default function StatusBar() {
    const status = useStatusBarStore(s => s.status)
    return <div className={styles.statusBar}>{status}</div>
}
