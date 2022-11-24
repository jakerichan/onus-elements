import { createContext } from 'react'
import { Register, Subscribe, Unregister } from '../../types'

const warn = (name?: string) => { console.warn('Onus-Element provider not found. Called from:', name) }

export interface OnusElementsContext {
  subscribe: Subscribe,
  register: Register,
  unregister: Unregister
}

const Context = createContext({
  subscribe: (name) => {
    warn(name)
    return warn
  },
  register: (entry, position) => warn(`register: ${entry.name}, position: ${position}`),
  unregister: (name, priority) => warn(`unregister: ${name}, priority: ${priority}`)
} as OnusElementsContext)
export default Context
export const Provider = Context.Provider
