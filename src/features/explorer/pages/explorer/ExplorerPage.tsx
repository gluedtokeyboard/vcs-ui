import styles from './ExplorerPage.module.css'
import Explorer from '../../filesystem/components/Explorer/Explorer.tsx'
import useIsEditingFile from '../../filesystem/hooks/useIsEditingFile.ts'
import FileEditor from '../../filesystem/components/FileEditor/FileEditor.tsx'
import { useLocation, useNavigate } from 'react-router'
import { useFilesystemStore } from '../../filesystem/stores/filesystemStore.ts'

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
        <Explorer />
        { isEditingFile && <FileEditor onClose={ navigateToCWD } onSubmit={ navigateToCWD } /> }
    </main>
}
