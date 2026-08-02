import icon from './copy.svg'
import { ClipboardOperationType } from '../../types/clipboard.types.ts'
import ClipboardButton from '../ClipboardButton/ClipboardButton.tsx'

export default function Copy() {
    return <ClipboardButton icon={icon} text='Copy' operation={ClipboardOperationType.COPY} />
}
