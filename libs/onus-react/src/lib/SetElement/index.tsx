import { useEffect, useContext, type ReactNode } from 'react'
import { getLocation } from '@onus-elements/core'
import { OnusElementsContext } from '../OnusElementsProvider'
import type { SetElementOptions } from '../useSetElement'

export interface SetElementProps extends SetElementOptions {
  children: ReactNode
}

const SetElement = ({
  children = null,
  prepend,
  append,
  priority,
  name,
}: SetElementProps): null => {
  const location = getLocation({ append, prepend })
  const { register, unregister } = useContext(OnusElementsContext)

  if (!register)
    console.error(
      'Onus Elements context not found. `OnusElementsProvider` is required'
    )

  useEffect(() => {
    if (!register) return undefined
    register({ children, name, priority }, location)
    return () => {
      unregister(name, priority)
    }
  }, [children, location, name, priority, register, unregister])

  return null
}

export default SetElement
