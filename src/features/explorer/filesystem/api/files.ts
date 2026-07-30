import type { File } from '../types/file.types.ts'
import { type Node, NodeType } from '../types/directory.types.ts'
import { FILESYSTEM_API_BASE_URL } from '../config/api.ts'
import api from '../../../../shared/lib/api.ts'

const FILE_ENDPOINT = `${FILESYSTEM_API_BASE_URL}/files`

export async function getFile(fileId: string): Promise<File> {
    // @ts-ignore
    return await api.get<File>(`${FILE_ENDPOINT}/${fileId}`)
}

export async function updateFile({ id, contents }: { id: string, contents: string }): Promise<File> {
    // @ts-ignore
    return await api.patch<File>(`${FILE_ENDPOINT}/${id}`, { contents })
}

export async function createFile(file: { path: string; contents?: string }): Promise<Node> {
    if (!file.contents) {
        file.contents = ''
    }
    // @ts-ignore
    const fileResponse = await api.post<File>(FILE_ENDPOINT, file) as File
    return {
        ...fileResponse,
        type: NodeType.FILE,
    }
}

export async function deleteFile(id: string): Promise<void> {
    await api.delete<void>(`${FILE_ENDPOINT}/${id}`)
}

export async function updateFilePath(file: { id: string, path: string }): Promise<File> {
    return await api.patch<File>(`${FILE_ENDPOINT}/${file.id}`, file) as unknown as File
}
