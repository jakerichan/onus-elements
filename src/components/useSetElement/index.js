import { useEffect, useContext } from 'react'
import { Context } from '../OnusElementsProvider'
import { getLocation } from '../utils'

const useSetElement = (options, content = null) => {
  const { register, unregister } = useContext(Context)
  if (!register) console.error('Onus Elements context not found. `OnusElementsProvider` is required')
  if (!options) console.error('useSetElement requires options as a first argument')

  const { append, prepend, priority, name } = options
  const location = getLocation({ append, prepend })

  useEffect(() => {
    if (!register) return

    register({ children: content, name, priority }, location)

    return () => { unregister(name, priority) }
  }, [content, location, name, priority, register, unregister])
}

export default useSetElement
