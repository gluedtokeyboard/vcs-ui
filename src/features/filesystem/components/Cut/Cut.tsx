import icon from './cut.svg'
import { ClipboardOperationType } from '../../types/clipboard.types.ts'
import ClipboardButton from '../ClipboardButton/ClipboardButton.tsx'

export default function Cut() {
    return <ClipboardButton icon={icon} text='Cut' operation={ClipboardOperationType.CUT} />
}
