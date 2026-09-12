import { useMutationWithStatus } from '../../explorer/hooks/useMutationWithStatus.ts'
import { stageFile } from '../api/staging.ts'
import type { StagingEntryType } from '../types/staging.types.ts'
import type { AppEvents } from '../../../app/events/AppEvents.ts'

type StagingEvent = {
    [K in keyof AppEvents]: AppEvents[K] extends Awaited<ReturnType<typeof stageFile>> ? K : never
}[keyof AppEvents]

export default function useStageFile(
        entryType: StagingEntryType,
        progressMessage?: string,
        successMessage?: string,
        emitEventOnSuccess?: StagingEvent,
) {
    return useMutationWithStatus({
        mutationFn(stagingData: { repoId: string, fileId: string }) {
            return stageFile({...stagingData, entryType})
        },
        progressMessage,
        successMessage,
        emitEventOnSuccess,
    })
}
