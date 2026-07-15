import { useMutation } from '@tanstack/react-query'
import queryClient from '../../../../app/queryClient.ts'

type WithId<T extends object = object> = T & { id: string }
type QueryAllData<R, K extends string | undefined = undefined> = K extends string ? Record<K, R[]> : R[]

export default function useOptimisticDelete<
        K extends string | undefined = undefined,
        Q extends QueryAllData<WithId, K> = QueryAllData<WithId, K>>(
            deleteFn: (id: string) => Promise<void>,
            queryKeyDetailFn: (id: string) => readonly string[],
            queryKeyAllFn: () => readonly string[],
            allDataAttribute?: K
): (id: string) => void {
    return useMutation({
        mutationFn: deleteFn,

        async onMutate(id) {
            const queryKeyDetail = queryKeyDetailFn(id)
            await queryClient.cancelQueries({ queryKey: queryKeyDetail })
            const queryKeyAll = queryKeyAllFn()
            await queryClient.cancelQueries( { queryKey: queryKeyAll })
            const previousItem = queryClient.getQueryData(queryKeyDetail)
            const previousItems = queryClient.getQueryData(queryKeyAll)
            queryClient.removeQueries({ queryKey: queryKeyDetail })
            queryClient.setQueryData(queryKeyAll, (previous: Q) => {
                let items
                if (allDataAttribute) {
                    items = (previous as Record<string, WithId[]>)[allDataAttribute]
                } else {
                    items = previous as WithId[]
                }
                items = items.filter((item) => item.id != id)
                if (allDataAttribute) {
                    return {
                        ...previous,
                        [allDataAttribute]: items
                    }
                } else {
                    return items
                }
            })
            return {
                previousItem,
                previousItems,
            }
        },

        onError(_err, id, context) {
            if (!context) {
                return
            }
            const queryKeyDetail = queryKeyDetailFn(id)
            queryClient.setQueryData(queryKeyDetail, context.previousItem)
            const queryKeyAll = queryKeyAllFn()
            queryClient.setQueryData(queryKeyAll, context.previousItems)
        },

        async onSettled() {
            const queryKeyAll = queryKeyAllFn()
            await queryClient.invalidateQueries({ queryKey: queryKeyAll })
        },
    }).mutate
}
