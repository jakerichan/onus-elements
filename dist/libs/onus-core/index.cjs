"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/events@3.3.0/node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/.pnpm/events@3.3.0/node_modules/events/events.js"(exports, module2) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter2() {
      EventEmitter2.init.call(this);
    }
    module2.exports = EventEmitter2;
    module2.exports.once = once;
    EventEmitter2.EventEmitter = EventEmitter2;
    EventEmitter2.prototype._events = void 0;
    EventEmitter2.prototype._eventsCount = 0;
    EventEmitter2.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter2.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter2.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter2.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter2.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
    EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter2.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter2.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter2.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter2.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter2.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// libs/onus-core/src/index.ts
var src_exports = {};
__export(src_exports, {
  OnusCore: () => OnusCore,
  POSITION_APPEND: () => POSITION_APPEND,
  POSITION_DEFAULT: () => POSITION_DEFAULT,
  POSITION_PREPEND: () => POSITION_PREPEND,
  getLocation: () => getLocation
});
module.exports = __toCommonJS(src_exports);

// libs/onus-core/src/lib/onus-core.ts
var import_events = __toESM(require_events());

// libs/onus-core/src/utils/index.ts
var POSITION_PREPEND = 2;
var POSITION_APPEND = 1;
var POSITION_DEFAULT = 0;
var getLocation = ({ append, prepend }) => {
  if (prepend)
    return POSITION_PREPEND;
  if (append)
    return POSITION_APPEND;
  return POSITION_DEFAULT;
};

// libs/onus-core/src/lib/onus-core.ts
var sortByPriority = (aStr, bStr) => {
  const a = Number(aStr);
  const b = Number(bStr);
  if (a > b)
    return 1;
  if (a < b)
    return -1;
  return 0;
};
var OnusCore = class {
  contents = {};
  emitter = new import_events.EventEmitter();
  getRegistry = (name) => {
    return this.contents[name];
  };
  subscribe = (name, callback) => {
    const subscription = (children) => {
      callback(children);
    };
    this.emitter.on(name, subscription);
    callback(this.findDeepest(name));
    return () => {
      this.emitter.removeListener(name, subscription);
    };
  };
  watch = (callback) => {
    function subscription(name, children) {
      callback(name, children);
    }
    this.emitter.on("__register__", subscription);
    for (const name in this.contents) {
      callback(name, this.findDeepest(name));
    }
    return () => {
      this.emitter.removeListener("__register__", subscription);
    };
  };
  register = ({ name, children, priority }, location = POSITION_DEFAULT) => {
    const content = this.contents[name] = this.contents[name] || {};
    content[priority] = { c: children, l: location };
    this.triggerDeepest(name);
  };
  unregister = (name, priority) => {
    const content = this.contents[name];
    if (content)
      delete content[priority];
    this.triggerDeepest(name);
  };
  triggerDeepest = (name) => {
    const deepest = this.findDeepest(name);
    this.emitter.emit(name, deepest);
    this.emitter.emit("__register__", name, deepest);
  };
  findDeepest = (name) => {
    const content = this.contents[name];
    if (!content)
      return [];
    return Object.keys(content).sort(sortByPriority).reduce((acc, k) => {
      const { l: location, c: children } = content[k];
      if (location === POSITION_APPEND)
        return [...acc, children];
      if (location === POSITION_PREPEND)
        return [children, ...acc];
      if (location === POSITION_DEFAULT)
        return [children];
      return acc;
    }, []);
  };
};
