import { PropsWithChildren, ReactNode } from 'react'
export interface GetElementProps extends PropsWithChildren {
  name: string
  children?: ReactNode
}

export interface SetElementOptions {
  name: string
  priority: number
  prepend?: boolean
  append?: boolean
}

export interface SetElementProps extends PropsWithChildren, SetElementOptions {}

export type UseSetElement = (
  config: SetElementOptions,
  content: unknown
) => void
