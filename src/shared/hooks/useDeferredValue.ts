import { useRef } from 'react'

export default function useDeferredValue<T>(initialValue?: T) {
    let value = useRef<T>(initialValue)
    return {
        get() {
            if (value.current == undefined) {
                throw new Error('Value has not been set')
            }
            return value.current
        },

        set(newValue: T) {
            value.current = newValue
        }
    }
}
