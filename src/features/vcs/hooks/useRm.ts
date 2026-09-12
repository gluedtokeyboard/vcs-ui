import useStageFile from './useStageFile.ts'
import { StagingEntryType } from '../types/staging.types.ts'
import { VcsEvent } from '../events/eventTypes.ts'

export default function useRm() {
    return useStageFile(
        StagingEntryType.DELETION,
        'Removing File...',
        'Done',
        VcsEvent.STAGING_RM,
    )
}
