/**
 * Module dependencies
 */

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
  var fns = {};
  var newListener = 'newListener';
  var removeListener = 'removeListener';

  emitter.on(removeListener, removeListenerFn);
  emitter.on(newListener, newListenerFn);

  function newListenerFn(name, ref) {
    var count = EventEmitter.listenerCount(emitter, name);
    if (count !== 0 || fns[name] || name === newListener || name === removeListener) return;
    var bound = fns[name] = fn.bind(null, name);
    emitter.on(name, bound);
  }
  function removeListenerFn(name) {
    var count = EventEmitter.listenerCount(emitter, name);
    if (count !== 1 || !fns[name] || name === newListener || name === removeListener) return;
    emitter.removeListener(name, fns[name]);
    delete fns[name];
  }

  return function() {
    emitter.removeListener(removeListener, removeListenerFn);
    emitter.removeListener(newListener, newListenerFn);
    for (var name in fns) {
      emitter.removeListener(name, fns[name]);
    }
  };
};

/**
 * Register content for a named block with a depth
 */
 
exports.register = function(name, children, depth, location) {
  var content = contents[name] = contents[name] || {};

  if (!children) delete content[depth];
  else content[depth] = {c: children, l: location || 0};
 
  emitter.emit(name, findDeepest(name));
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
