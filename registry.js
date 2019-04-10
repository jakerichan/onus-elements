/**
 * Module dependencies
 */
var React = require('react');
var EventEmitter = require('events').EventEmitter;
 
var contents = {};
var emitter = new EventEmitter();

/**
 * Subscribe to a named content block
 */
 
exports.subscribe = function(name, fn) {
  function subscription(children) {
    fn(children);
  }
  emitter.on(name, subscription);
  fn(findDeepest(name));
  return function() {
    emitter.removeListener(name, subscription);
  };
};

/**
 * Watch the blocks being registered
 */

exports.watch = function(fn) {
  function subscription(name, children) {
    fn(name, children);
  }
  emitter.on('__register__', subscription);

  for (var name in contents) {
    fn(name, findDeepest(name));
  }

  return function() {
    emitter.removeListener('__register__', subscription);
  };
};

/**
 * Register content for a named block with a priority
 */
 
exports.register = function(props, location) {
  var name = props.name;
  var children = props.children;
  var priority = props.priority;
  var withProps = props.withProps;
  var content = contents[name] = contents[name] || {};
  if (withProps) {
    var currentDeepest = findDeepest(name)[0];
    children = !currentDeepest ? children : React.cloneElement(currentDeepest, withProps);
  }
  if (children) {
    content[priority] = {c: children, l: location || 0};
  } else {
    delete content[priority];
  }
  var deepest = findDeepest(name);

  emitter.emit(name, deepest);
  emitter.emit('__register__', name, deepest);
};
 
function findDeepest(name) {
  var content = contents[name] = contents[name] || {};
  return Object.keys(content).sort().reduce(function(acc, k) {
    var item = content[k];
    var location = item.l;
    var children = item.c;
    if (location === 0) acc = [children];
    if (location === 1) acc.unshift(children);
    if (location === 2) acc.push(children);
    return acc;
  }, []);
}
