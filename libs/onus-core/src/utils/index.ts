import { ContentPriority, GetLocation } from '../../types'

export const POSITION_PREPEND = 2
export const POSITION_APPEND = 1
export const POSITION_DEFAULT = 0

export const getLocation: GetLocation = ({ append, prepend }) => {
  if (prepend) return POSITION_PREPEND
  if (append) return POSITION_APPEND
  return POSITION_DEFAULT
}

export const sortByPriority = (aStr: string, bStr: string) => {
  const a = Number(aStr)
  const b = Number(bStr)
  if (a > b) return 1
  if (a < b) return -1
  return 0
}

export const buildContentStack =
  (content: ContentPriority) => (acc: unknown[], k: string) => {
    const { l: location, c: children } = content[k]
    if (location === POSITION_APPEND) return [...acc, children]
    if (location === POSITION_PREPEND) return [children, ...acc]
    if (location === POSITION_DEFAULT) return [children]
    return acc
  }
