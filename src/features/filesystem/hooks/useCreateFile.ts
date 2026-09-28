import useOptimisticAdd from '../../../shared/hooks/useOptimisticAdd.ts'
import { fileKeys } from '../queries/keys.ts'
import { getCwdQueryKey } from '../queries/helpers.ts'
import { createFile } from '../api/files.ts'

export default function useCreateFile() {
    return useOptimisticAdd({
        addFn: createFile,
        queryKeyDetailFn: fileKeys.detail,
        queryKeyAllFn: getCwdQueryKey,
        allDataAttribute: 'contents',
    })
}
