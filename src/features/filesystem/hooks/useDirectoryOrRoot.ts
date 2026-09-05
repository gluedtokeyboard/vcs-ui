import {useDirectory} from "./useDirectory.ts";
import {useRootDirectory} from "./useRootDirectory.ts";

export function useDirectoryOrRoot(id: string | undefined) {
    return id ? useDirectory(id) : useRootDirectory()
}
