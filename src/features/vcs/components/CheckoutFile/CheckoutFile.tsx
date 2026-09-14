import icon from './checkout.svg'
import FormDialog from '../../../../shared/components/dialogs/FormDialog/FormDialog.tsx'
import DialogButton from '../../../../shared/components/buttons/DialogButton/DialogButton.tsx'
import { useForm } from 'react-hook-form'
import useCheckoutFile from '../../hooks/useCheckoutFile.ts'
import { joinToCwd } from '../../../filesystem/utils.ts'
import { useCurrentRepo } from '../../hooks/useCurrentRepo.ts'
import styles from '../../../../shared/styles/Form.module.css'

export default function CheckoutFile() {
    const checkoutFile = useCheckoutFile()
    const repo = useCurrentRepo().data

    function handleSubmit(commitPrefix: string, relativePath: string) {
        const path = joinToCwd(relativePath)
        checkoutFile.mutate({
            repoId: repo!.id,
            ...(commitPrefix && { commitPrefix }),
            path,
        })
    }

    const CheckoutFileDialogButton = DialogButton(CheckoutFileDialog)
    return <CheckoutFileDialogButton
        buttonProps={{
            text: 'Checkout File',
            icon,
            disabled: !repo,
        }}
        dialogProps={{
            onSubmit: handleSubmit,
        }}
    />
}

type CheckoutFileDialogProps = {
    onClose: () => void,
    onSubmit: (commitPrefix: string, relativePath: string) => void,
}

function CheckoutFileDialog({ onClose, onSubmit }: CheckoutFileDialogProps) {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const errorMessage = errors.relativePath?.message as string | undefined
    const inputClass = errorMessage ? styles.inputError : styles.input

    const handleSubmit_ = handleSubmit(({ commitPrefix, relativePath }) => {
        onSubmit(commitPrefix, relativePath)
        onClose()
    })

    return <FormDialog onClose={onClose} onSubmit={handleSubmit_}>
        <div className={styles.title}>Checkout File</div>
        <hr />
        <input
            className={inputClass}
            placeholder='Enter the file path relative to the current directory.'
            autoFocus
            {...register('relativePath', {
                required: 'Please enter the file path.',
            })}
        />
        <br />
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        <input
            className={styles.input}
            placeholder='Enter a commit prefix. Leave blank for HEAD.'
            {...register('commitPrefix')}
        />
    </FormDialog>
}
