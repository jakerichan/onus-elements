import { useEffect, useContext, useCallback } from 'react'
import { Context } from '../OnusElementsProvider'
import { getLocation } from '../utils'

const useSetElement = (options, content = null) => {
  const { register, unregister } = useContext(Context)
  if (!register) console.error('Onus Elements context not found. `OnusElementsProvider` is required')
  if (!options) console.error('useSetElement requires options as a first argument')

  const { append, prepend, priority, name } = options
  const location = getLocation({ append, prepend })

  const registerNode = useCallback(children => {
    if (!register) return

    register({ children, name, priority }, location)

    return () => { unregister(name, priority) }
  }, [location, name, priority, register, unregister])

  useEffect(() => {
    registerNode(content)
  }, [content, registerNode])
}

export default useSetElement
