import StagingButton from '../StagingButton/StagingButton.tsx'
import icon from './rm.svg'
import useRm from '../../hooks/useRm.ts'

export default function Rm() {
    return <StagingButton
        text='Rm'
        icon={icon}
        useStageFileHook={useRm}
    />
}
