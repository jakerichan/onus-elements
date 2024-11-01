import { useEffect, useContext, ReactNode } from 'react'
import { getLocation } from '@onus-elements/core'
import { OnusElementsContext } from '../OnusElementsProvider'

export interface SetElementOptions {
  name: string
  priority: number
  prepend?: boolean
  append?: boolean
}

export type UseSetElement = (
  options: SetElementOptions,
  content: ReactNode
) => void

const useSetElement: UseSetElement = (options, content = null) => {
  const { register, unregister } = useContext(OnusElementsContext)

  if (!register)
    console.error(
      'Onus Elements context not found. `OnusElementsProvider` is required'
    )
  if (!options)
    console.error('useSetElement requires options as a first argument')

  const { append, prepend, priority, name } = options
  const location = getLocation({ append, prepend })

  useEffect(() => {
    if (!register) return undefined

    register({ children: content, name, priority }, location)

    return () => {
      unregister(name, priority)
    }
  }, [content, location, name, priority, register, unregister])
}

export default useSetElement
