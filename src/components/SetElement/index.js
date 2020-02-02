import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  Context,
  POSITION_APPEND,
  POSITION_DEFAULT,
  POSITION_PREPEND
} from '../OnusElementsProvider'

const childrenDefault = <></>
const SetElement = ({ children = childrenDefault, prepend, append, priority, name }) => {
  let location = append ? POSITION_APPEND : POSITION_DEFAULT
  if (prepend) location = POSITION_PREPEND
  const { register, unregister } = useContext(Context)
  useEffect(() => {
    register({ children, name, priority }, location)
    return () => {
      unregister(name, priority)
    }
  }, [children, location, name, priority, register, unregister])

  return null
}

SetElement.propTypes = {
  children: PropTypes.element,
  prepend: PropTypes.bool,
  append: PropTypes.bool,
  name: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired
}

export default SetElement
