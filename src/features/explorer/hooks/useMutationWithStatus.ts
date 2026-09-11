import { useMutation } from '@tanstack/react-query'
import { useStatusBarStore } from '../stores/statusBarStore.ts'
import type { AppEvents } from '../../../app/events/AppEvents.ts'
import { eventBus } from '../../../app/events'
import axios from 'axios'
import type { ErrorResponse } from '../../../shared/types/api.types.ts'
import type { ErrorEvent } from '../../../shared/types/event.types.ts'

type UseMutationWithStatusCommonArgs = {
    progressMessage?: string,
    successMessage?: string,
    showErrorMessage?: boolean,
    emitEventOnError?: ErrorEvent,
}

type UseMutationWithStatusSuccessEventArgs<MutationFnArg> = {
    [K in keyof AppEvents]: {
        mutationFn: (arg: MutationFnArg) => Promise<AppEvents[K]>,
        emitEventOnSuccess: K
    }
}[keyof AppEvents]

type UseMutationWithStatusNoSuccessEventArgs<MutationFnArg> = {
    mutationFn: (arg: MutationFnArg) => Promise<unknown>
    emitEventOnSuccess?: never
}

type UseMutationWithStatusArgs<MutationFnArg> =
    (UseMutationWithStatusSuccessEventArgs<MutationFnArg> | UseMutationWithStatusNoSuccessEventArgs<MutationFnArg>)
    & UseMutationWithStatusCommonArgs

const SUCCESS_MESSAGE_DURATION = 3000
const ERROR_MESSAGE_DURATION = 5000

export function useMutationWithStatus<MutationFnArg>({
        mutationFn, progressMessage, successMessage, showErrorMessage = true, emitEventOnSuccess, emitEventOnError
}: UseMutationWithStatusArgs<MutationFnArg>) {
    const setStatus = useStatusBarStore(state => state.setStatus)
    return useMutation({
        mutationFn,

        onMutate() {
            if (progressMessage) {
                setStatus(progressMessage)
            }
        },

        onSuccess(data) {
            if (emitEventOnSuccess) {
                eventBus.emit(
                    emitEventOnSuccess,
                    data as AppEvents[typeof emitEventOnSuccess]
                )
            }
            if (successMessage) {
                setStatus(successMessage, SUCCESS_MESSAGE_DURATION)
            }
        },

        onError(error) {
            if (axios.isAxiosError<ErrorResponse>(error)) {
                const responseData = error.response?.data
                if (responseData) {
                    if (emitEventOnError) {
                        eventBus.emit(emitEventOnError, responseData)
                    }
                    if (showErrorMessage) {
                        const errorMessage = `Error: ${responseData.message}`
                        setStatus(errorMessage, ERROR_MESSAGE_DURATION)
                    }
                }
            }
        }
    })
}
