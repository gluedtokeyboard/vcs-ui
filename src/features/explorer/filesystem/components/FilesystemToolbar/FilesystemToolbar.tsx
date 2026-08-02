import Toolbar from '../../../components/Toolbar/Toolbar.tsx'
import NewFolder from '../NewFolder/NewFolder.tsx'
import NewFile from '../NewFile/NewFile.tsx'
import Spacer from '../../../components/Spacer/Spacer.tsx'
import Delete from '../Delete/Delete.tsx'
import Rename from '../Rename/Rename.tsx'
import Cut from '../Cut/Cut.tsx'
import Cancel from '../Cancel/Cancel.tsx'
import Copy from '../Copy/Copy.tsx'

export default function FilesystemToolbar() {
    return <Toolbar>
        <NewFolder />
        <NewFile />
        <Spacer />
        <Cancel />
        <Cut />
        <Copy />
        <Rename />
        <Delete />
    </Toolbar>
}
