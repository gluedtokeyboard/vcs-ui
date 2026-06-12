import { useQuery } from '@tanstack/react-query'
import { directoryKeys } from '../queries/keys.ts'
import { getRootDirectory } from '../api/directories.ts'
import queryClient from '../../../../app/queryClient.ts'

export function useRootDirectory() {
    return useQuery({
        queryKey: directoryKeys.root(),
        queryFn: async () => {
            const data = await getRootDirectory()
            queryClient.setQueryData(directoryKeys.detail(data.id), data)
            return data
        },
    })
}
