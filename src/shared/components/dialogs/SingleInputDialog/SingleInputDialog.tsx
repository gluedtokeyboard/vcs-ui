import FormDialog from '../FormDialog/FormDialog.tsx'
import styles from './SingleInputDialog.module.css'
import { type RegisterOptions, useForm } from 'react-hook-form'

type SingleInputDialogProps = {
    title: string,
    inputPlaceholder: string,
    onSubmit: (input: string) => void,
    onClose: () => void,
    registerOptions?: RegisterOptions,
}

export default function SingleInputDialog(
    { title, inputPlaceholder, onSubmit, onClose, registerOptions = {} }: SingleInputDialogProps) {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const errorMessage = errors.input?.message as string | undefined
    const className = errorMessage ? styles.inputError : styles.input

    const handleSubmit_ = handleSubmit(({ input }) => {
        onSubmit(input)
        onClose()
    })

    return <FormDialog onSubmit={handleSubmit_} onClose={onClose}>
        <div className={styles.title}>{title}</div>
        <hr />
        <input
            className={className}
            placeholder={inputPlaceholder}
            autoFocus
            {...register('input', registerOptions)}
        />
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </FormDialog>
}
