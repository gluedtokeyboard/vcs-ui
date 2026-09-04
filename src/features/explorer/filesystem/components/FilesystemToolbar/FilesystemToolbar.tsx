import Toolbar from '../../../../../shared/components/Toolbar/Toolbar.tsx'
import NewFolder from '../NewFolder/NewFolder.tsx'
import NewFile from '../NewFile/NewFile.tsx'
import Spacer from '../../../../../shared/components/Spacer/Spacer.tsx'
import Delete from '../Delete/Delete.tsx'
import Rename from '../Rename/Rename.tsx'
import Cut from '../Cut/Cut.tsx'
import Cancel from '../Cancel/Cancel.tsx'
import Copy from '../Copy/Copy.tsx'
import Paste from '../Paste/Paste.tsx'

export default function FilesystemToolbar() {
    return <Toolbar>
        <NewFolder />
        <NewFile />
        <Spacer />
        <Cancel />
        <Cut />
        <Copy />
        <Paste />
        <Rename />
        <Delete />
    </Toolbar>
}
