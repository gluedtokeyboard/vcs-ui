import type { Directory } from '../types/directory.types.ts'
import { FILESYSTEM_API_BASE_URL } from '../config/api.ts'
import api from '../../../../shared/lib/api.ts'

const DIRECTORY_ENDPOINT = `${FILESYSTEM_API_BASE_URL}/directories`

export async function getDirectory(directoryId: string): Promise<Directory> {
    // @ts-ignore
    return await api.get<Directory>(`${DIRECTORY_ENDPOINT}/${directoryId}`)
}

export async function getRootDirectory(): Promise<Directory> {
    // @ts-ignore
    return await api.get<Directory>(`${DIRECTORY_ENDPOINT}/root`)
}
