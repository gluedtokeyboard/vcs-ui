import Button_, { type ButtonProps as ButtonProps_ } from '../Button/Button.tsx'
import useDialog, { type DialogProps, type DialogPropsWithOptionalOnClose } from '../../../hooks/useDialog.tsx'
import * as React from 'react'

type ButtonProps = Omit<ButtonProps_, 'onClick'> & { onClick?: () => void }
type WrappedButtonProps<T extends DialogProps> = {
    buttonProps: ButtonProps,
    dialogProps: DialogPropsWithOptionalOnClose<T>
}

export default function DialogButton<T extends DialogProps>(Dialog: React.ComponentType<T>) {
    function WrappedButton({ buttonProps, dialogProps }: WrappedButtonProps<T>) {
        const { Dialog: Dialog_, open } = useDialog(Dialog)
        let handleClick
        let onClick = buttonProps.onClick
        if (onClick) {
            handleClick = () => {
                onClick()
                open()
            }
        } else {
            handleClick = open
        }
        return (
            <>
                <Button_ {...buttonProps} onClick={handleClick} />
                <Dialog_ {...dialogProps} />
            </>
        )
    }

    return WrappedButton
}
