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
    emitter.removeEventListener(subscription);
  };
};

/**
 * Register content for a named block with a depth
 */
 
exports.register = function(name, children, depth) {
  var content = contents[name] = contents[name] || {};
 
  if (!children) delete content[depth];
  else content[depth] = children;
 
  emitter.emit(name, findDeepest(name));
};
 
function findDeepest(name) {
  var content = contents[name] = contents[name] || {};
  var deepest;
  for (var k in content) {
    if (content.hasOwnProperty(k) && (!deepest || k > deepest)) deepest = k;
  }
  return content[deepest];
}