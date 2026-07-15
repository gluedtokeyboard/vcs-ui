import useOptimisticUpdate from './useOptimisticUpdate.ts'
import { updateFile } from '../api/files.ts'
import { fileKeys } from '../queries/keys.ts'

export default () => useOptimisticUpdate(updateFile, fileKeys.detail)
