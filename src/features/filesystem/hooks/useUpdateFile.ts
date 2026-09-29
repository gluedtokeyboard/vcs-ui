import useOptimisticUpdate from '../../../shared/hooks/useOptimisticUpdate.ts'
import { updateFile } from '../api/files.ts'
import { fileKeys } from '../queries/keys.ts'
import { FilesystemEvent } from '../events/eventTypes.ts'

export default () => useOptimisticUpdate({
    updateFn: updateFile,
    queryKeyDetailFn: fileKeys.detail,
    emitEventOnSuccess: FilesystemEvent.FILE_UPDATED,
})
