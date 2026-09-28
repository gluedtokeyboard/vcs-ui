import { createDirectory } from '../api/directories.ts'
import useOptimisticAdd from '../../../shared/hooks/useOptimisticAdd.ts'
import { directoryKeys } from '../queries/keys.ts'
import { getCwdQueryKey } from '../queries/helpers.ts'

export default function useCreateDirectory() {
    return useOptimisticAdd({
        addFn: createDirectory,
        queryKeyDetailFn: directoryKeys.detail,
        queryKeyAllFn: getCwdQueryKey,
        allDataAttribute: 'contents',
    })
}
