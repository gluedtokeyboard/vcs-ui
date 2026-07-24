import useOptimisticAdd from './useOptimisticAdd.ts'
import { fileKeys } from '../queries/keys.ts'
import { getCwdQueryKey } from '../queries/helpers.ts'
import { createFile } from '../api/files.ts'

export default function useCreateFile() {
    return useOptimisticAdd(createFile, fileKeys.detail, getCwdQueryKey, 'contents')
}
