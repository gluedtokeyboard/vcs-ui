import type { File } from "../types/file.types.ts";
import { fetchJson } from "../../../../shared/lib/fetch.ts";
import { FILESYSTEM_API_BASE_URL } from "../config/api.ts";

const FILE_ENDPOINT = `${FILESYSTEM_API_BASE_URL}/files`;

export async function getFile(fileId: string): Promise<File> {
    return await fetchJson<File>(`${FILE_ENDPOINT}/${fileId}`)
}
