'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var core = require('@onus-elements/core');

var warn = function(name) {
    console.warn("Onus-Element provider not found. Called from:", name);
};
var Context = react.createContext({
    subscribe: function(name) {
        warn("GetElement named ".concat(name));
        return warn;
    },
    register: function(entry, position) {
        return warn("SetElement or useSetElement named ".concat(entry.name, ", position ").concat(position));
    },
    unregister: function(name, priority) {
        return warn("Unmounting a SetElement or useSetElement named ".concat(name, ", priority: ").concat(priority));
    }
});
var Provider = Context.Provider;

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
// This wrapper is required to be wrapped around any usage of OnusElements
var OnusElementsProvider = /*#__PURE__*/ function(Component) {
    _inherits(OnusElementsProvider, Component);
    var _super = _createSuper(OnusElementsProvider);
    function OnusElementsProvider(props) {
        _classCallCheck(this, OnusElementsProvider);
        var _this;
        _this = _super.call(this, props);
        _this.subscribe = function(name, callback) {
            return _this.onusCore.subscribe(name, callback);
        };
        _this.register = function(entry, position) {
            return _this.onusCore.register(entry, position);
        };
        _this.unregister = function(name, priority) {
            return _this.onusCore.unregister(name, priority);
        };
        _this.onusCore = props.core || new core.OnusCore();
        return _this;
    }
    var _proto = OnusElementsProvider.prototype;
    _proto.render = function render() {
        var children = this.props.children;
        return /*#__PURE__*/ jsxRuntime.jsx(Provider, {
            value: {
                register: this.register,
                subscribe: this.subscribe,
                unregister: this.unregister
            },
            children: children
        });
    };
    return OnusElementsProvider;
}(react.Component);

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
var GetElement = function(param) {
    var name = param.name, _param_children = param.children, children = _param_children === void 0 ? null : _param_children;
    var subscribe = react.useContext(Context).subscribe;
    var _useState = _slicedToArray(react.useState([]), 2), content = _useState[0], setContent = _useState[1];
    if (!subscribe) {
        console.error("Onus Elements context not found. `OnusElementsProvider` is required", name);
    }
    react.useEffect(function() {
        if (!subscribe || !name) return;
        subscribe(name, setContent);
    }, [
        name,
        subscribe
    ]);
    var getContent = function() {
        return content.length ? content : children;
    };
    return /*#__PURE__*/ jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: getContent()
    });
};

var SetElement = function(param) {
    var _param_children = param.children, children = _param_children === void 0 ? null : _param_children, prepend = param.prepend, append = param.append, priority = param.priority, name = param.name;
    var location = core.getLocation({
        append: append,
        prepend: prepend
    });
    var _useContext = react.useContext(Context), register = _useContext.register, unregister = _useContext.unregister;
    if (!register) console.error("Onus Elements context not found. `OnusElementsProvider` is required");
    react.useEffect(function() {
        if (!register) return;
        register({
            children: children,
            name: name,
            priority: priority
        }, location);
        return function() {
            unregister(name, priority);
        };
    }, [
        children,
        location,
        name,
        priority,
        register,
        unregister
    ]);
    return null;
};

var useSetElement = function(options) {
    var content = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var _useContext = react.useContext(Context), register = _useContext.register, unregister = _useContext.unregister;
    if (!register) console.error("Onus Elements context not found. `OnusElementsProvider` is required");
    if (!options) console.error("useSetElement requires options as a first argument");
    var append = options.append, prepend = options.prepend, priority = options.priority, name = options.name;
    var location = core.getLocation({
        append: append,
        prepend: prepend
    });
    react.useEffect(function() {
        if (!register) return;
        register({
            children: content,
            name: name,
            priority: priority
        }, location);
        return function() {
            unregister(name, priority);
        };
    }, [
        content,
        location,
        name,
        priority,
        register,
        unregister
    ]);
};

exports.GetElement = GetElement;
exports.OnusElementsProvider = OnusElementsProvider;
exports.SetElement = SetElement;
exports.useSetElement = useSetElement;
