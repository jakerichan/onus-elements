import { Component, type ReactNode } from 'react'
import { OnusCore } from '@onus-elements/core'
import type { OnusCoreType } from '@onus-elements/core'
import type { Register, Subscribe, Unregister } from '@onus-elements/core'
import Context, { type OnusElementsContextValue } from './Context'

export interface OnusElementsProviderProps {
  children: ReactNode
  core?: OnusCoreType
}

// This wrapper is required to be wrapped around any usage of OnusElements
class OnusElementsProvider extends Component<OnusElementsProviderProps> {
  get onusCore(): OnusCoreType {
    return this.props.core || new OnusCore()
  }

  subscribe: Subscribe = (name, callback) =>
    this.onusCore.subscribe(name, callback)

  register: Register = (entry, position) =>
    this.onusCore.register(entry, position)

  unregister: Unregister = (name, priority) =>
    this.onusCore.unregister(name, priority)

  getPriorityForName = (name: string): number => this.onusCore.getPriorityForName(name)

  override render(): React.ReactNode {
    const { children } = this.props
    return (
      <Context.Provider
        value={
          {
            core: this.onusCore,
            register: this.register,
            subscribe: this.subscribe,
            unregister: this.unregister,
            getPriorityForName: this.getPriorityForName,
          } as OnusElementsContextValue
        }
      >
        {children}
      </Context.Provider>
    )
  }
}

export default OnusElementsProvider
