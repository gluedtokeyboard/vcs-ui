import icon from './cancel.svg'
import Button from '../../../components/buttons/Button/Button.tsx'
import useHasClipboardContent from '../../hooks/useHasClipboardContent.ts'
import { useClipboardStore } from '../../stores/clipboardStore.ts'

export default function Cancel() {
    const hasClipboardContent = useHasClipboardContent()

    function handleClick() {
        useClipboardStore.getState().clearClipboardContent()
    }

    return hasClipboardContent && <Button icon={icon} text='Cancel' onClick={handleClick} />
}
