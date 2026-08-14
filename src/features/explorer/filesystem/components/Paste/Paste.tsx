import icon from './paste.svg'
import Button from '../../../components/buttons/Button/Button.tsx'
import useHasClipboardContent from '../../hooks/useHasClipboardContent.ts'
import useCut from '../../hooks/useCut.ts'
import { ClipboardOperationType } from '../../types/clipboard.types.ts'
import { useClipboardStore } from '../../stores/clipboardStore.ts'
import type { Node } from '../../types/directory.types.ts'
import { getCurrentWorkingDirectory } from '../../utils.ts'
import { getCwdQueryKey } from '../../queries/helpers.ts'
import useCopy from '../../hooks/useCopy.ts'

export default function Paste() {
    const isClipboardEmpty = !useHasClipboardContent()
    const clipboardFns = {
        [ClipboardOperationType.CUT]: useCut(),
        [ClipboardOperationType.COPY]: useCopy(),
    }

    function handleClick() {
        const clipboardOperation = useClipboardStore.getState().clipboardOperation as ClipboardOperationType
        const clipboardNode = useClipboardStore.getState().clipboardNode as Node
        const cwd = getCurrentWorkingDirectory()
        const cwdQueryKey = getCwdQueryKey()
        clipboardFns[clipboardOperation](clipboardNode, cwd.path, cwdQueryKey)
        useClipboardStore.getState().clearClipboardContent()
    }

    return <Button icon={icon} text='Paste' onClick={handleClick} disabled={isClipboardEmpty} />
}
