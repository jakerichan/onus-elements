import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Context } from '../OnusElementsProvider'

const GetElement = ({ name }) => {
  const { subscribe } = useContext(Context)
  const [content = null, setContent] = useState(null)
  useEffect(() => subscribe(name, setContent), [name, subscribe])

  return <>{content}</>
}

GetElement.propTypes = {
  name: PropTypes.string.isRequired
}

export default GetElement
