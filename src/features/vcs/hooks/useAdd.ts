import useStageFile from './useStageFile.ts'
import { StagingEntryType } from '../types/staging.types.ts'
import { VcsEvent } from '../events/eventTypes.ts'

export default function useAdd() {
    return useStageFile(
        StagingEntryType.ADDITION,
        'Staging File...',
        'Done',
        VcsEvent.STAGING_ADD,
    )
}
