import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EventEmitter } from 'events'
import Context from './Context'

export const POSITION_PREPEND = 2
export const POSITION_APPEND = 1
export const POSITION_DEFAULT = 0

class OnusElementsProvider extends Component {
  constructor (props) {
    super(props)
    this.contents = {}
    this.emitter = new EventEmitter()
  }

  /**
   * subscribe - Subscribe to a named content block
   * @param {string} name | name of the element to subscribe to
   * @param {function} callback | function to call when element is found
  */

  subscribe = (name, callback) => {
    const subscription = (children) => {
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
  */
  watch = function (callback) {
    function subscription (name, children) {
      callback(name, children)
    }
    this.emitter.on('__register__', subscription)

    for (var name in this.contents) {
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

  register = ({ name, children, priority }, location = POSITION_DEFAULT) => {
    const content = this.contents[name] = this.contents[name] || {}
    content[priority] = { c: children, l: location }

    this.triggerDeepest(name)
  }

  /**
   * unregister - Remove element from registry
   * @param {string} name | name of the element to remove
   * @param {number} priority | determines the instance to remove
  */
  unregister = (name, priority) => {
    const content = this.contents[name] = this.contents[name] || {}
    delete content[priority]
    this.triggerDeepest(name)
  }

  /**
   * Trigger the deepest element to render
   * @param {string} name | name of the element to find highest priority of and trigger rendering
  */
  triggerDeepest = (name) => {
    var deepest = this.findDeepest(name)

    this.emitter.emit(name, deepest)
    this.emitter.emit('__register__', name, deepest)
  }

  findDeepest = (name) => {
    const content = this.contents[name] = this.contents[name] || {}
    return Object.keys(content).sort().reduce((acc, k) => {
      var { l: location, c: children } = content[k]
      if (location === POSITION_DEFAULT) acc = children
      if (location === POSITION_PREPEND) acc = <>{children}{acc}</>
      if (location === POSITION_APPEND) acc = <>{acc}{children}</>
      return acc
    }, [])
  }

  render () {
    const { children } = this.props
    return (
      <Context.Provider value={{
        register: this.register,
        subscribe: this.subscribe,
        unregister: this.unregister
      }}
      >
        {children}
      </Context.Provider>
    )
  }
}

OnusElementsProvider.propTypes = {
  children: PropTypes.node
}

export { Context }
export default OnusElementsProvider
