import { Component, PropsWithChildren } from 'react'
import { OnusCore } from '@onus-elements/core'
import { Register, Subscribe, Unregister } from '@onus-elements/core/types'
import Context, { Provider, OnusElementsContext } from './Context'

interface OnusElementsProviderProps extends PropsWithChildren {
  core: OnusCore
}

// This wrapper is required to be wrapped around any usage of OnusElements
class OnusElementsProvider extends Component<PropsWithChildren> {
  private onusCore

  constructor(props: OnusElementsProviderProps) {
    super(props)
    this.onusCore = props.core || new OnusCore()
  }

  subscribe: Subscribe = (name, callback) =>
    this.onusCore.subscribe(name, callback)

  register: Register = (entry, position) =>
    this.onusCore.register(entry, position)

  unregister: Unregister = (name, priority) =>
    this.onusCore.unregister(name, priority)

  getPriorityForName = (name: string) => this.onusCore.getPriorityForName(name)

  override render(): React.ReactNode {
    const { children } = this.props
    return (
      <Provider
        value={
          {
            register: this.register,
            subscribe: this.subscribe,
            unregister: this.unregister,
            getPriorityForName: this.getPriorityForName,
          } as OnusElementsContext
        }
      >
        {children}
      </Provider>
    )
  }
}

export { Context }

export default OnusElementsProvider
