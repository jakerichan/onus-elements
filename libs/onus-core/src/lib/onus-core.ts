import { EventEmitter } from 'events'
import { POSITION_DEFAULT, sortByPriority, buildContentStack } from '../utils'
import {
  ContentsObject,
  FindDeepest,
  Register,
  Subscribe,
  TriggerDeepest,
  Unregister,
  Watch,
} from '../../types'

export class OnusCore {
  private contents: ContentsObject = {}
  private emitter = new EventEmitter()

  /**
   * @name getRegistry
   * @description returns the priority registry for a name
   * @param name Name of the content
   * @returns {ContentsObject} all priorities of the contents registered to that name
   */
  getRegistry = (name: string): unknown => {
    return this.contents[name]
  }

  /**
   * @name subscribe
   * @description Subscribe to a named content block
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
   * @name watch
   * @description Watch the blocks being registered
   * @param {function} callback |  fucntion to call when element is registered
   * @returns {function} cleanup function to remove event listener
   */
  watch: Watch = (callback: CallableFunction) => {
    function subscription(name: string, children: unknown) {
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
   * @name register
   * @description Register content for a named block with a priority
   * @param {object} props | the props passed to SetElement
   * @param {number} location | POSITION_PREPEND, POSITION_APPEND, or POSITION_DEFAULT
   */

  register: Register = (
    { name, children, priority },
    location = POSITION_DEFAULT
  ) => {
    const content = (this.contents[name] = this.contents[name] || {})
    content[priority] = { c: children, l: location }
    this.triggerDeepest(name)
  }

  /**
   * @name unregister
   * @description Remove element from registry
   * @param {string} name | name of the element to remove
   * @param {number} priority | determines the instance to remove
   */
  unregister: Unregister = (name, priority) => {
    const content = this.contents[name]
    if (content) delete content[priority]
    this.triggerDeepest(name)
  }

  /**
   * @name getPriorityForName
   * @description Returns the highest priority number regestered for a given name
   * @param name the name of the content
   * @returns {number} highets priority for given content. Returns -1 when name is not registered
   */
  getPriorityForName = (name: string) => {
    const content = this.contents[name]
    if (!content) return -1
    return Number(Object.keys(content).sort(sortByPriority).pop())
  }

  /**
   * @name triggerDeepest
   * @description Trigger the deepest element to render
   * @param {string} name | name of the element to find highest priority of and trigger rendering
   */
  private triggerDeepest: TriggerDeepest = (name) => {
    const deepest = this.findDeepest(name)

    this.emitter.emit(name, deepest)
    this.emitter.emit('__register__', name, deepest)
  }

  /**
   * @name findDeepest
   * @description Finds the deepest set of a given content name, including any "appended" or "prepended" items
   * @param name The name of the content object
   * @returns The deepest "set" of content registered
   */
  private findDeepest: FindDeepest = (name) => {
    const content = this.contents[name]
    if (!content) return []
    return Object.keys(content)
      .sort(sortByPriority)
      .reduce(buildContentStack(content), [])
  }
}
