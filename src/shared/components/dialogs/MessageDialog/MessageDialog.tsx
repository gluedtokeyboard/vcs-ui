import Dialog from '../Dialog/Dialog.tsx'
import styles from './MessageDialog.module.css'

type MessageDialogProps = {
    message: string,
    onClose: () => void,
}

export default function MessageDialog({ message, onClose }: MessageDialogProps) {
    return <Dialog onClose={ onClose }>
        <div className={ styles.message }>{ message }</div>
    </Dialog>
}
