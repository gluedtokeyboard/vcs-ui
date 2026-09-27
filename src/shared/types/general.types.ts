import type { ReactNode } from 'react'

export type ComponentFunction<T extends object = {}> = (props: T) => ReactNode
export type StrictOmit<T, K extends keyof T> = Omit<T, K>
