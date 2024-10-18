import type { Register, Subscribe, Unregister } from '@onus-elements/core'
import { createContext } from 'react'

const warn = (name?: string) => {
  console.warn('Onus-Element provider not found. Called from:', name)
}

export interface OnusElementsContext {
  subscribe: Subscribe
  register: Register
  unregister: Unregister
  getPriorityForName: (name: string) => number
}

const Context = createContext<OnusElementsContext>({
  subscribe: (name) => {
    warn(`GetElement named ${name}`)
    return warn
  },
  register: (entry, position) =>
    warn(
      `SetElement or useSetElement named ${entry.name}, position ${position}`
    ),
  unregister: (name, priority) =>
    warn(
      `Unmounting a SetElement or useSetElement named ${name}, priority: ${priority}`
    ),
  getPriorityForName: () => -1,
})

export default Context
