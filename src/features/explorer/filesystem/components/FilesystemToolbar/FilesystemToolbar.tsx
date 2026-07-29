import Toolbar from '../../../components/Toolbar/Toolbar.tsx'
import NewFolder from '../NewFolder/NewFolder.tsx'
import NewFile from '../NewFile/NewFile.tsx'
import Spacer from '../../../components/Spacer/Spacer.tsx'

export default function FilesystemToolbar() {
    return <Toolbar>
        <NewFolder />
        <NewFile />
        <Spacer />
    </Toolbar>
}
