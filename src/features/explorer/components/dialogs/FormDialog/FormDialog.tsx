import Dialog from '../Dialog/Dialog.tsx'
import * as React from 'react'
import styles from './FormDialog.module.css'

type FormDialogProps = React.PropsWithChildren<{
    onClose: () => void,
    onSubmit: () => void,
}>

export default function FormDialog({ onSubmit, onClose, children }: FormDialogProps) {
    return <Dialog onClose={onClose}>
        <form className={styles.form} onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
        }}>
            {children}
            <div className={styles.buttons}>
                <button className={styles.cancel} type='button' onClick={onClose}>Cancel</button>
                <button className={styles.submit} type='submit'>Submit</button>
            </div>
        </form>
    </Dialog>
}
