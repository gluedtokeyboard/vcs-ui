import type { File } from '../types/file.types.ts'
import { FILESYSTEM_API_BASE_URL } from '../config/api.ts'
import api from '../../../../shared/lib/api.ts'

const FILE_ENDPOINT = `${FILESYSTEM_API_BASE_URL}/files`

export async function getFile(fileId: string): Promise<File> {
    // @ts-ignore
    return await api.get<File>(`${FILE_ENDPOINT}/${fileId}`)
}
