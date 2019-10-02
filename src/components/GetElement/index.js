import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { subscribe } from '../../utils/registry'

const GetElement = ({ name }) => {
  const [ content = null, setContent ] = useState(null)
  useEffect(() => subscribe(name, setContent), [name])

  return <Fragment>{content}</Fragment>
}

GetElement.propTypes = {
  name: PropTypes.string.isRequired
}

export default GetElement
