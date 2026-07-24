import { useState } from 'react'
import * as React from 'react'

export type DialogProps = {
    onClose: () => void,
}
export type DialogPropsWithOptionalOnClose<T extends DialogProps> = Omit<T, 'onClose'> & { onClose?: () => void }

export default function useDialog<T extends DialogProps>(Dialog: React.ComponentType<T>, isInitiallyOpen = false) {
    const [isOpen, setOpen] = useState(isInitiallyOpen)

    function open() {
        setOpen(true);
    }

    function close() {
        setOpen(false);
    }

    function WrappedDialog(props: DialogPropsWithOptionalOnClose<T>) {
        let handleClose
        let onClose = props.onClose
        if (onClose) {
            handleClose = () => {
                onClose()
                close()
            }
        } else {
            handleClose = close
        }
        const newProps = {
            ...props,
            onClose: handleClose,
        } as T
        return isOpen ? <Dialog {...newProps} /> : null
    }

    return {
        isOpen,
        open,
        close,
        Dialog: WrappedDialog,
    }
}
