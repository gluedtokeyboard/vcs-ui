type EventPayload = Record<string, unknown> | void
type Events = Record<string, EventPayload>
type EventListener<T> = (payload: T) => void
type ListenerMap<E extends Events> = {
    [K in keyof E]?: Set<EventListener<E[K]>>
}

export class EventBus<E extends Events> {
    private listeners: ListenerMap<E> = {}

    emit<K extends keyof E>(event: K, payload: E[K]): void {
        this.listeners[event]?.forEach((listener) => listener(payload))
    }

    subscribe<K extends keyof E>(event: K, listener: EventListener<E[K]>) {
        let listeners = this.listeners[event]
        if (!listeners) {
            listeners = new Set<EventListener<E[K]>>()
            this.listeners[event] = listeners
        }
        listeners.add(listener)
        return () => {
            listeners.delete(listener)
        }
    }
}
