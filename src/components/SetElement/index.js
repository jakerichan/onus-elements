import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { register, unregister, POSITION_APPEND, POSITION_DEFAULT, POSITION_PREPEND } from '../../utils/registry'

const childrenDefault = <Fragment />
const SetElement = ({ children = childrenDefault, prepend, append, priority, name, withProps }) => {
  let location = append ? POSITION_APPEND : POSITION_DEFAULT
  if (prepend) location = POSITION_PREPEND

  useEffect(() => {
    register({ children, name, priority, withProps }, location)
    return () => {
      unregister(name, priority)
    }
  }, [children, location, name, priority, withProps])

  return null
}

SetElement.propTypes = {
  children: PropTypes.element,
  prepend: PropTypes.bool,
  append: PropTypes.bool,
  name: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  withProps: PropTypes.object
}

export default SetElement
