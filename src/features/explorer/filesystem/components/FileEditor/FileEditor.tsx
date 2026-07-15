import styles from './FileEditor.module.css'
import FormDialog from '../../../components/dialogs/FormDialog/FormDialog.tsx'
import { useParams } from 'react-router'
import { useFile } from '../../hooks/useFile.ts'
import { getBasename } from '../../../../../shared/lib/utils.ts'
import { useForm } from 'react-hook-form'
import useUpdateFile from '../../hooks/useUpdateFile.ts'
import MessageDialog from '../../../components/dialogs/MessageDialog/MessageDialog.tsx'

type FileEditorProps = {
    onClose: () => void,
    onSubmit: () => void,
}

export default function FileEditor({ onClose, onSubmit }: FileEditorProps) {
    const id = useParams().id as string
    const { isLoading, data, error } = useFile(id)
    const { register, handleSubmit } = useForm()
    const updateFile = useUpdateFile()

    if (isLoading || error) {
        const message = (isLoading) ? 'Loading...' : 'An error has occurred.'
        return <MessageDialog message={ message } onClose={ onClose } />
    }
    if (data) {
        const fileName = getBasename(data.path)
        return <FormDialog onClose={ onClose } onSubmit={
                handleSubmit(({ contents }) => {
                    updateFile({ id, contents })
                    onSubmit()
                })
        }>
            <div className={ styles.fileName }>{ fileName }</div>
            <textarea className={ styles.fileContents } {...register('contents', {value: data.contents})} autoFocus />
        </FormDialog>
    }
}
