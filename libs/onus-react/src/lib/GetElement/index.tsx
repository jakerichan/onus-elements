import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Context } from '../OnusElementsProvider'
import { GetElementProps } from '../../types'

const GetElement = ({ name, children = null }: GetElementProps) => {
  const { subscribe } = useContext(Context)
  const [content = null, setContent] = useState(null)
  if (!subscribe) {
    console.error('Onus Elements context not found. `OnusElementsProvider` is required', name)
  }

  useEffect(() => {
    if (!subscribe || !name) return
    subscribe(name, setContent)
  }, [name, subscribe])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{content || children}</>
}

GetElement.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired
}

export default GetElement
