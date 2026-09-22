import { useState } from 'react'

type Function = (...args: any[]) => any

export default function useFunction<F extends Function>(fn: F | null = null) {
    const [state, setState] = useState<F | null>(() => fn)

    function setFn(newFn: F | null) {
        setState(() => newFn)
    }

    return [state, setFn] as const
}
