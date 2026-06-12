import type {Directory} from "../types/directory.types.ts";
import {fetchJson} from "../../../../shared/lib/fetch.ts";
import {FILESYSTEM_API_BASE_URL} from "../config/api.ts";

const DIRECTORY_ENDPOINT = `${FILESYSTEM_API_BASE_URL}/directories`;

export async function getDirectory(directoryId: string): Promise<Directory> {
    return await fetchJson<Directory>(`${DIRECTORY_ENDPOINT}/${directoryId}`)
}

export async function getRootDirectory(): Promise<Directory> {
    return await fetchJson<Directory>(`${DIRECTORY_ENDPOINT}/root`);
}
