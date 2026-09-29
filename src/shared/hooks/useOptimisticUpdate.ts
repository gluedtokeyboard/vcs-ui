import { useMutation } from '@tanstack/react-query'
import queryClient from '../../app/queryClient.ts'
import { eventBus } from '../../app/events'
import type { AppEvents } from '../../app/events/AppEvents.ts'

type WithId<T extends object> = T & { id: string }
type QueryAllData<R, K extends string | undefined = undefined> = K extends string ? Record<K, R[]> : R[]
type UseOptimisticUpdateArgs<
        T extends object,
        R extends WithId<T>,
        E extends keyof AppEvents | undefined = undefined,
        K extends string | undefined = undefined> = {
    updateFn: (arg: WithId<T>) => Promise<E extends keyof AppEvents ? AppEvents[E] & R : R>,
    queryKeyDetailFn: (id: string) => readonly string[],
    queryKeyAllFn?: () => readonly string[],
    allDataAttribute?: K,
    emitEventOnSuccess?: E,
}

export default function useOptimisticUpdate<
        T extends object,
        R extends WithId<T>,
        E extends keyof AppEvents | undefined = undefined,
        K extends string | undefined = undefined,
        Q extends QueryAllData<R, K> = QueryAllData<R, K>>({
            updateFn,
            queryKeyDetailFn,
            queryKeyAllFn,
            allDataAttribute,
            emitEventOnSuccess,
}: UseOptimisticUpdateArgs<T, R, E, K>): (arg: WithId<T>) => void {
    return useMutation({
        mutationFn: updateFn,

        async onMutate({ id, ...rest }) {
            const queryKeyDetail = queryKeyDetailFn(id)
            await queryClient.cancelQueries({ queryKey: queryKeyDetail })
            const previousItem = queryClient.getQueryData<R>(queryKeyDetail)
            queryClient.setQueryData(queryKeyDetail, (previousItem: R) => {
                return {
                    ...previousItem,
                    ...rest,
                }
            })
            let previousItems
            if (queryKeyAllFn) {
                const queryKeyAll = queryKeyAllFn()
                await queryClient.cancelQueries({ queryKey: queryKeyAll })
                previousItems = queryClient.getQueryData<Q>(queryKeyAll)
                queryClient.setQueryData(queryKeyAll, (previous: Q) => {
                    let items
                    if (allDataAttribute) {
                        items = (previous as Record<string, R[]>)[allDataAttribute]
                    } else {
                        items = previous as R[]
                    }
                    items = items.map((item) =>
                        (item.id == id) ? {
                            ...item,
                            ...rest,
                        } : item
                    )
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
            return {
                previousItem,
                previousItems,
            }
        },

        onSuccess(serverItem) {
            if (emitEventOnSuccess) {
                eventBus.emit(
                    emitEventOnSuccess,
                    serverItem as AppEvents[typeof emitEventOnSuccess]
                )
            }
        },

        onError(_err, { id }, context) {
            if (!context) {
                return
            }
            const queryKeyDetail = queryKeyDetailFn(id)
            queryClient.setQueryData(queryKeyDetail, context.previousItem)
            if (queryKeyAllFn) {
                const queryKeyAll = queryKeyAllFn()
                queryClient.setQueryData(queryKeyAll, context.previousItems)
            }
        },

        async onSettled(_data, _error, { id }) {
            const queryKeyDetail = queryKeyDetailFn(id)
            await queryClient.invalidateQueries({ queryKey: queryKeyDetail })
            if (queryKeyAllFn) {
                const queryKeyAll = queryKeyAllFn()
                await queryClient.invalidateQueries({ queryKey: queryKeyAll })
            }
        },
    }).mutate
}
