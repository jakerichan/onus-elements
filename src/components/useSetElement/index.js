import { useEffect, useContext, useState } from 'react'
import { Context } from '../OnusElementsProvider'
import { getLocation } from '../utils'

const useSetElement = (options, content = null) => {
  const [node, setNode] = useState(content)
  const { register, unregister } = useContext(Context)
  if (!register) console.error('Onus Elements context not found. `OnusElementsProvider` is required')
  if (!options) console.error('useSetElement requires options as a first argument')

  const { append, prepend, priority, name } = options
  const location = getLocation({ append, prepend })

  useEffect(() => {
    if (!register) return
    register({ children: node, name, priority }, location)
    return () => {
      unregister(name, priority)
    }
  }, [node, location, name, priority, register, unregister])

  useEffect(() => {
    setNode(content)
  }, [content])

  return setNode
}

export default useSetElement
