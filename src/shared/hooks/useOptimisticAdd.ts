import { useMutation } from '@tanstack/react-query'
import queryClient from '../../app/queryClient.ts'
import { eventBus } from '../../app/events'
import type { AppEvents } from '../../app/events/AppEvents.ts'

type WithId<T> = T & { id: string }
type QueryAllData<R, K extends string | undefined = undefined> = K extends string ? Record<K, R[]> : R[]
type UseOptimisticAddArgs<
        T extends object,
        R extends WithId<T>,
        E extends keyof AppEvents | undefined = undefined,
        K extends string | undefined = undefined> = {
    addFn: (item: T) => Promise<E extends keyof AppEvents ? AppEvents[E] & R : R>,
    queryKeyDetailFn?: (id: string) => readonly string[],
    queryKeyAllFn?: () => readonly string[],
    allDataAttribute?: K,
    emitEventOnSuccess?: E,
}

export default function useOptimisticAdd<
        T extends object,
        R extends WithId<T>,
        E extends keyof AppEvents | undefined = undefined,
        K extends string | undefined = undefined,
        Q extends QueryAllData<R, K> = QueryAllData<R, K>>({
            addFn,
            queryKeyDetailFn,
            queryKeyAllFn,
            allDataAttribute,
            emitEventOnSuccess,
}: UseOptimisticAddArgs<T, R, E, K>): (item: T) => void {
    return useMutation({
        mutationFn: addFn,

        async onMutate(item) {
            let optimisticId = crypto.randomUUID()
            const optimisticItem = {
                id: optimisticId,
                ...item,
            }
            let previousItems
            if (queryKeyAllFn) {
                let queryKeyAll = queryKeyAllFn()
                await queryClient.cancelQueries({ queryKey: queryKeyAll })
                previousItems = queryClient.getQueryData<Q>(queryKeyAll)
                queryClient.setQueryData(queryKeyAll, (previous: Q) => {
                    let items
                    if (allDataAttribute) {
                        items = (previous as Record<string, R[]>)[allDataAttribute]
                    } else {
                        items = previous as R[]
                    }
                    items = [
                        ...items,
                        optimisticItem
                    ]
                    if (allDataAttribute) {
                        return {
                            ...previous,
                            [allDataAttribute]: items
                        }
                    } else {
                        return items
                    }
                })
            }
            if (queryKeyDetailFn) {
                const queryKeyDetailOptimistic = queryKeyDetailFn(optimisticId)
                queryClient.setQueryData(queryKeyDetailOptimistic, optimisticItem)
            }
            return {
                previousItems,
                optimisticId,
            }
        },

        onSuccess(serverItem, _variables, context) {
            if (!context) {
                return
            }
            const optimisticId = context.optimisticId
            if (queryKeyAllFn) {
                const queryKeyAll = queryKeyAllFn()
                queryClient.setQueryData(queryKeyAll, (previous: Q) => {
                    let items
                    if (allDataAttribute) {
                        items = (previous as Record<string, R[]>)[allDataAttribute]
                    } else {
                        items = previous as R[]
                    }
                    items = items.map((item) => item.id == optimisticId ? serverItem : item)
                    if (allDataAttribute) {
                        return {
                            ...previous,
                            [allDataAttribute]: items
                        }
                    } else {
                        return items
                    }
                })
            }
            if (queryKeyDetailFn) {
                const queryKeyDetailOptimistic = queryKeyDetailFn(optimisticId)
                queryClient.removeQueries({ queryKey: queryKeyDetailOptimistic })
                const queryKeyDetailReal = queryKeyDetailFn(serverItem.id)
                queryClient.setQueryData(queryKeyDetailReal, serverItem)
            }
            if (emitEventOnSuccess) {
                eventBus.emit(
                    emitEventOnSuccess,
                    serverItem as AppEvents[typeof emitEventOnSuccess]
                )
            }
        },

        onError(_err, _variables, context) {
            if (!context) {
                return
            }
            if (queryKeyAllFn) {
                const queryKeyAll = queryKeyAllFn()
                queryClient.setQueryData(queryKeyAll, context.previousItems)
            }
            if (queryKeyDetailFn) {
                const queryKeyDetailOptimistic = queryKeyDetailFn(context.optimisticId)
                queryClient.removeQueries({ queryKey: queryKeyDetailOptimistic })
            }
        },

        async onSettled() {
            if (queryKeyAllFn) {
                const queryKeyAll = queryKeyAllFn()
                await queryClient.invalidateQueries({ queryKey: queryKeyAll })
            }
        },
    }).mutate
}
