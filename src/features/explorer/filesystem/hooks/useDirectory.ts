import {useQuery} from "@tanstack/react-query";
import {directoryKeys} from "../queries/keys.ts";
import {getDirectory} from "../api/directories.ts";

export function useDirectory(id: string) {
    return useQuery({
        queryKey: directoryKeys.detail(id),
        queryFn: () => getDirectory(id),
    })
}
