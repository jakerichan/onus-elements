import { useState, useEffect, useContext, Fragment, type ReactNode } from 'react'
import { OnusElementsContext } from '../OnusElementsProvider'

export interface GetElementProps {
  name: string
  children?: ReactNode
}

const GetElement = ({ name, children = null }: GetElementProps): ReactNode => {
  const { subscribe, getPriorityForName } = useContext(OnusElementsContext)
  const [content, setContent] = useState<ReactNode[]>([])
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
