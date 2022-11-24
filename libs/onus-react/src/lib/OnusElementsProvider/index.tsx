import { Component, PropsWithChildren } from 'react'
import { EventEmitter } from 'events'
import Context, { Provider, OnusElementsContext } from './Context'
import { POSITION_APPEND, POSITION_PREPEND, POSITION_DEFAULT } from '../utils'
import { ContentsObject, FindDeepest, Register, Subscribe, TriggerDeepest, Unregister, Watch } from '../../types'

const sortNumbers = (aStr: string, bStr: string) => {
  const a = Number(aStr)
  const b = Number(bStr)
  if (a > b) return 1
  if (a < b) return -1
  return 0
}

class OnusElementsProvider extends Component<PropsWithChildren> {
  
  private contents: ContentsObject = {}

  private emitter = new EventEmitter()

  /**
   * subscribe - Subscribe to a named content block
   * @param {string} name | name of the element to subscribe to
   * @param {function} callback | function to call when element is found
  */

  subscribe: Subscribe = (name, callback) => {
    const subscription = (children: unknown) => {
      callback(children)
    }
    this.emitter.on(name, subscription)
    callback(this.findDeepest(name))
    return () => {
      this.emitter.removeListener(name, subscription)
    }
  }

  /**
   * watch - Watch the blocks being registered
   * @param {function} callback |  fucntion to call when element is registered
   * @returns {function} cleanup function to remove event listener
  */
  watch: Watch = (callback: CallableFunction) => {
    function subscription (name: string, children: unknown) {
      callback(name, children)
    }
    this.emitter.on('__register__', subscription)

    for (const name in this.contents) {
      callback(name, this.findDeepest(name))
    }

    return () => {
      this.emitter.removeListener('__register__', subscription)
    }
  }

  /**
   * register - Register content for a named block with a priority
   * @param {object} props | the props passed to SetElement
   * @param {number} location | POSITION_PREPEND, POSITION_APPEND, or POSITION_DEFAULT
  */

  register: Register = ({ name, children, priority }, location = POSITION_DEFAULT) => {
    const content = this.contents[name] = this.contents[name] || {}
    content[priority] = { c: children, l: location }
    this.triggerDeepest(name)
  }

  /**
   * unregister - Remove element from registry
   * @param {string} name | name of the element to remove
   * @param {number} priority | determines the instance to remove
  */
  unregister: Unregister = (name, priority) => {
    const content = this.contents[name]
    if (content) delete content[priority]
    this.triggerDeepest(name)
  }

  /**
   * Trigger the deepest element to render
   * @param {string} name | name of the element to find highest priority of and trigger rendering
  */
  triggerDeepest: TriggerDeepest = (name) => {
    const deepest = this.findDeepest(name)

    this.emitter.emit(name, deepest)
    this.emitter.emit('__register__', name, deepest)
  }

  findDeepest: FindDeepest = (name) => {
    const content = this.contents[name]
    if (!content) return null
    return Object.keys(content)
      .sort(sortNumbers)
      .reduce((acc: [], k: string) => {
        const { l: location, c: children } = content[k]
        if (location === POSITION_DEFAULT) return children
        if (location === POSITION_PREPEND) return <>{children}{acc}</>
        if (location === POSITION_APPEND) return <>{acc}{children}</>
        return acc
      }, [])
  }

  override render(): React.ReactNode {
    const { children } = this.props
    return (
      <Provider
        value={{
          register: this.register,
          subscribe: this.subscribe,
          unregister: this.unregister
        } as OnusElementsContext}
      >
        {children}
      </Provider>
    )
  }
}

export { Context }
export default OnusElementsProvider
