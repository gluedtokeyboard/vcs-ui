import icon from './add.svg'
import StagingButton from '../StagingButton/StagingButton.tsx'
import useAdd from '../../hooks/useAdd.ts'

export default function Add() {
    return <StagingButton
        text='Add'
        icon={icon}
        useStageFileHook={useAdd}
    />
}
