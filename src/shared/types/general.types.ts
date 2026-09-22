import type { ReactNode } from 'react'

export type ComponentFunction<T extends object = {}> = (props: T) => ReactNode
