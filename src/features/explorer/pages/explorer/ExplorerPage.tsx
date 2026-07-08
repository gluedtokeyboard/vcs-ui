import styles from './ExplorerPage.module.css'
import Explorer from '../../filesystem/components/Explorer/Explorer.tsx'

export default function ExplorerPage() {
    return <main className={ styles.explorerPage }>
        <Explorer />
    </main>
}
