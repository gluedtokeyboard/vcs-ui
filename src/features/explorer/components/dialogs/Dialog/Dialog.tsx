import * as React from 'react'
import styles from './Dialog.module.css'

type DialogProps = React.PropsWithChildren<{
    onClose: () => void,
}>

export default function Dialog({ onClose, children }: DialogProps) {
    function handleClick(e: React.MouseEvent) {
        if (e.target != e.currentTarget) {
            return
        }
        onClose()
    }

    function handleEscape(e: React.KeyboardEvent) {
        if (e.key == 'Escape') {
            onClose()
        }
    }

    return <div className={styles.dialog} onClick={handleClick} onKeyDown={handleEscape}>
        {children}
    </div>
}
