import { GetLocation } from '../../types'

export const POSITION_PREPEND = 2
export const POSITION_APPEND = 1
export const POSITION_DEFAULT = 0

export const getLocation: GetLocation = ({ append, prepend }) => {
  if (prepend) return POSITION_PREPEND
  if (append) return POSITION_APPEND
  return POSITION_DEFAULT
}
