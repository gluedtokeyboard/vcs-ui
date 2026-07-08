import { useQuery } from "@tanstack/react-query";
import { fileKeys } from "../queries/keys.ts";
import { getFile } from "../api/files.ts";

export function useFile(id: string) {
    return useQuery({
        queryKey: fileKeys.detail(id),
        queryFn: () => getFile(id),
    })
}
