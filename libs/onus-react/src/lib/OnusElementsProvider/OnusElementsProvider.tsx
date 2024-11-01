import { createContext, useMemo } from 'react'
import { OnusCore } from '@onus-elements/core'
import type { OnusCoreType } from '@onus-elements/core'
import type { Register, Subscribe, Unregister } from '@onus-elements/core'

export interface OnusElementsProviderProps {
  children: React.ReactNode
  core?: OnusCoreType
}

const OnusElementsProvider = ({ children, core }: OnusElementsProviderProps): JSX.Element => {
  const onusCore = useMemo(() => core || new OnusCore(), [core])

  const subscribe: Subscribe = (name, callback) => onusCore.subscribe(name, callback)
  const register: Register = (entry, position) => onusCore.register(entry, position)
  const unregister: Unregister = (name, priority) => onusCore.unregister(name, priority)
  const getPriorityForName = (name: string): number => onusCore.getPriorityForName(name)

  return (
    <OnusElementsContext.Provider
      value={{
        core: onusCore,
        subscribe,
        register,
        unregister,
        getPriorityForName,
      }}
    >
      {children}
    </OnusElementsContext.Provider>
  )
}

const warn = (name?: string) => {
  console.warn('Onus-Element provider not found. Called from:', name)
}

export interface OnusElementsContextValue {
  core: OnusCore | null
  subscribe: Subscribe
  register: Register
  unregister: Unregister
  getPriorityForName: (name: string) => number
}

export const OnusElementsContext = createContext<OnusElementsContextValue>({
  core: null,
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

export default OnusElementsProvider
