import styles from './ExplorerPage.module.css'
import Explorer from '../../../filesystem/components/Explorer/Explorer.tsx'
import useIsEditingFile from '../../../filesystem/hooks/useIsEditingFile.ts'
import FileEditor from '../../../filesystem/components/FileEditor/FileEditor.tsx'
import { useLocation, useNavigate } from 'react-router'
import { useFilesystemStore } from '../../../filesystem/stores/filesystemStore.ts'
import FilesystemToolbar from '../../../filesystem/components/FilesystemToolbar/FilesystemToolbar.tsx'
import StatusBar from '../../components/StatusBar/StatusBar.tsx'
import VcsToolbar from '../../../vcs/components/VcsToolbar/VcsToolbar.tsx'
import VcsSidebar from '../../../vcs/components/VcsSidebar/VcsSidebar.tsx'
import NavigationToolbar from '../../components/NavigationToolbar/NavigationToolbar.tsx'

export default function ExplorerPage() {
    const isEditingFile = useIsEditingFile()
    const navigate = useNavigate()
    const location = useLocation()
    const currentWorkingDirectory = useFilesystemStore.getState().currentWorkingDirectory

    function navigateToCWD() {
        if (location.state?.openedFromExplorer) {
            navigate(-1)
        } else {
            let link
            if (currentWorkingDirectory != '') {
                link = `/directories/${currentWorkingDirectory}`
            } else {
                link = '/'
            }
            navigate(link, { replace: true })
        }
    }

    return <main className={ styles.explorerPage }>
        <div className={styles.topRow}>
            <div className={styles.navigationToolbar}>
                <NavigationToolbar />
            </div>
            <div className={styles.fsToolbar}>
                <FilesystemToolbar />
            </div>
        </div>
        <div className={styles.vcsToolbar}>
            <VcsToolbar />
        </div>
        <div className={styles.explorer}>
            <Explorer />
        </div>
        <div className={styles.vcsSidebar}>
            <VcsSidebar />
        </div>
        <div className={styles.statusBar}>
            <StatusBar />
        </div>
        { isEditingFile && <FileEditor onClose={ navigateToCWD } onSubmit={ navigateToCWD } /> }
    </main>
}
