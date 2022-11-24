import { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Context } from '../OnusElementsProvider'
import { getLocation } from '../utils'
import { SetElementProps } from '../../types'

const SetElement = ({ children = null, prepend, append, priority, name }: SetElementProps) => {
  const location = getLocation({ append, prepend })
  const { register, unregister } = useContext(Context)

  if (!register) console.error('Onus Elements context not found. `OnusElementsProvider` is required')

  useEffect(() => {
    if (!register) return
    register({ children, name, priority }, location)
    return () => {
      unregister(name, priority)
    }
  }, [children, location, name, priority, register, unregister])
  return null
}

SetElement.propTypes = {
  children: PropTypes.node,
  prepend: PropTypes.bool,
  append: PropTypes.bool,
  name: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired
}

export default SetElement
