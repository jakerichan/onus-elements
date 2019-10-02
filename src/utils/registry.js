/**
 * Module dependencies
 */
import React, { Fragment, cloneElement } from 'react'
import { EventEmitter } from 'events'

const contents = {}
const emitter = new EventEmitter()

export const POSITION_PREPEND = 2
export const POSITION_APPEND = 1
export const POSITION_DEFAULT = 0

/**
 * Subscribe to a named content block
 * @param {string} name | name of the element to subscribe to
 * @param {function} callback | function to call when element is found
 */

export const subscribe = (name, callback) => {
  const subscription = (children) => {
    callback(children)
  }
  emitter.on(name, subscription)
  callback(findDeepest(name))
  return () => {
    emitter.removeListener(name, subscription)
  }
}

/**
 * Watch the blocks being registered
 * @param {function} callback |  fucntion to call when element is registered
 */

export const watch = function (callback) {
  function subscription (name, children) {
    callback(name, children)
  }
  emitter.on('__register__', subscription)

  for (var name in contents) {
    callback(name, findDeepest(name))
  }

  return () => {
    emitter.removeListener('__register__', subscription)
  }
}

/**
 * Trigger the deepest element to render
 * @param {string} name | name of the element to find highest priority of and trigger rendering
 */
const triggerDeepest = (name) => {
  var deepest = findDeepest(name)

  emitter.emit(name, deepest)
  emitter.emit('__register__', name, deepest)
}

/**
 * Register content for a named block with a priority
 * @param {object} props | the props passed to SetElement
 * @param {number} location | 1 prepends, 2 appends, 0 is default
 */

export const register = ({ name, children, priority, withProps }, location = POSITION_DEFAULT) => {
  const content = contents[name] = contents[name] || {}
  if (withProps) {
    const currentDeepest = findDeepest(name)

    children = !currentDeepest ? children : cloneElement(currentDeepest, withProps)
  }
  content[priority] = { c: children, l: location }

  triggerDeepest(name)
}

/**
 * Remove element from registry
 * @param {string} name | name of the element to remove
 * @param {number} priority | determines the instance to remove
 */
export const unregister = (name, priority) => {
  const content = contents[name] = contents[name] || {}
  delete content[priority]
  triggerDeepest(name)
}

function findDeepest (name) {
  const content = contents[name] = contents[name] || {}
  return Object.keys(content).sort().reduce((acc, k) => {
    var { l: location, c: children } = content[k]
    if (location === POSITION_DEFAULT) acc = children
    if (location === POSITION_PREPEND) acc = <Fragment>{children}{acc}</Fragment>
    if (location === POSITION_APPEND) acc = <Fragment>{acc}{children}</Fragment>
    return acc
  }, [])
}
