import type { AppEvents } from '../../app/events/AppEvents.ts'
import type { ErrorResponse } from './api.types.ts'

export type EventWithPayload<Payload> = {
    [K in keyof AppEvents]: AppEvents[K] extends Payload ? K : never
}[keyof AppEvents]

export type ErrorEvent = EventWithPayload<ErrorResponse>
