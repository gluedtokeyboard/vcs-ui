import { type Directory, type Node, NodeType } from '../types/directory.types.ts'
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

export async function createDirectory(directory: { path: string }): Promise<Node> {
    // @ts-ignore
    const directoryResponse = await api.post<Directory>(DIRECTORY_ENDPOINT, directory) as Directory
    return {
        ...directoryResponse,
        type: NodeType.DIRECTORY,
    }
}

export async function deleteDirectory(id: string): Promise<void> {
    await api.delete<void>(`${DIRECTORY_ENDPOINT}/${id}`)
}

export async function updateDirectoryPath(directory: { id: string, path: string }): Promise<Directory> {
    return await api.patch<Directory>(`${DIRECTORY_ENDPOINT}/${directory.id}`, directory) as unknown as Directory
}
