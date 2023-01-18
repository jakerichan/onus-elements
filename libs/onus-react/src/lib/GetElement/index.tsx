import { useState, useEffect, useContext, Fragment } from 'react'
import { Context } from '../OnusElementsProvider'
import { GetElementProps } from '../../types'

const GetElement = ({ name, children = null }: GetElementProps) => {
  const { subscribe, getPriorityForName } = useContext(Context)
  const [content, setContent] = useState([])
  if (!subscribe) {
    console.error(
      'Onus Elements context not found. `OnusElementsProvider` is required',
      name
    )
  }

  useEffect(() => {
    if (!subscribe || !name) return
    subscribe(name, setContent)
  }, [name, subscribe])

  const getContent = () =>
    content.length
      ? content.map((e, i) => (
          <Fragment key={`${name}:${getPriorityForName(name)}:${i}`}>
            {e}
          </Fragment>
        ))
      : children

  return <>{getContent()}</>
}

export default GetElement
