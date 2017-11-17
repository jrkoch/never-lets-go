/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(40)('wks');
var uid = __webpack_require__(28);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var ctx = __webpack_require__(6);
var hide = __webpack_require__(7);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(38);
module.exports = __webpack_require__(9) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(63);
var toPrimitive = __webpack_require__(64);
var dP = Object.defineProperty;

exports.f = __webpack_require__(9) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(80);

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__(43);

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = __webpack_require__(29);

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = __webpack_require__(97);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = __webpack_require__(100);

var _map2 = _interopRequireDefault(_map);

var _events = __webpack_require__(18);

var _EnplugError = __webpack_require__(116);

var _EnplugError2 = _interopRequireDefault(_EnplugError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// todo finish reject timeout
/*global _epBridge  _epBridgeSend*/

/*
Message Formatting: (as JSON string)
{
  service: ‘string’,        // required
  action: ‘string’,         // required
  payload: Object | Array,  // optional
  meta: Object,             // optional
  token: ‘string’           // required when a response is expected (internal use only)
}
 */

var RESPONSE_TIMEOUT = 60 * 1000;
var VERSION = '0.4.11';
var WHITELIST = ['http://apps.enplug.com', 'http://apps.enplug.in', 'http://dashboard.enplug.com', 'http://dashboard.enplug.in', 'http://dashboard.enplug.loc', 'http://player.enplug.com', 'http://player.enplug.in', 'http://player.enplug.loc', 'https://apps.enplug.com', 'https://apps.enplug.in', 'https://dashboard.enplug.com', 'https://dashboard.enplug.in', 'https://dashboard.enplug.loc', 'https://player.enplug.com', 'https://player.enplug.in', 'https://player.enplug.loc'];

var epBridge = null;
var responseMap = new _map2.default();
var isZoningApp = false;
var delayedMessages = [];

/**
 * Creates a unique token used to identify apprpriate message response function.
 * @return {string} - A unique token.
 */
function createToken() {
  var token = Math.random().toString(36).substr(2);
  // Make sure a unique token is created. If created token already exists, create a different one.
  if (responseMap.has(token)) {
    return createToken();
  }
  return token;
}

// Check for the existence of the global bridge object. If it doesn't, create one so that it can
// send and receive messages from the Web Player.
try {
  (function () {
    isZoningApp = !!window.location.href && window.location.href.indexOf('zoning=true') >= 0;
    console.log('[Player SDK: ' + VERSION + '] Zoning App detected: ' + isZoningApp);
    var $global = Function('return this')(); // eslint-disable-line

    // _epBridge exists: Java Player
    if ($global.hasOwnProperty('_epBridge')) {
      console.log('[Player SDK: ' + VERSION + '] Creating bridge from standard implementation.');
      epBridge = $global._epBridge;
    }
    // _epBridge doesn't exist but _epBridgeSend exists: Windows (CEF) Player
    else if ($global.hasOwnProperty('_epBridgeSend')) {
        console.log('[Player SDK: ' + VERSION + '] Creating bridge from CEF implementation.', $global._epBridge);
        epBridge = $global._epBridge = {
          send: function send(message) {
            $global._epBridgeSend({
              request: message,
              persistent: false
            });
          }
        };
      } else {
        epBridge = _epBridge;
      }
  })();
} catch (error) {
  // epBridge was not found. In such case, we assume that the application is iframed within
  // WebPlayer and communication has to proceed via posting and receiving messages between windows.
  console.info('[Player SDK: ' + VERSION + '] Initializing Web Development Player.');

  epBridge = {
    send: function send(msg) {
      var destinationMatch = window.location.href.match(/origin=(https?\:\/\/[a-z]*\.[a-z]*\.[a-z]{2,3})/);
      var destination = destinationMatch && destinationMatch[1];
      console.log('[Player SDK: ' + VERSION + '] Validating destination ' + destination + ' with the whitelist.', destination);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(WHITELIST), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var whitelistedUrl = _step.value;

          if (destination === whitelistedUrl) {
            console.log('[Player SDK: ' + VERSION + '] Whitelist match found. Posting message.', msg, destination);
            parent.postMessage(msg, destination);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  };

  window.addEventListener('message', function (event) {
    // Prevent unnencessary loops/CPU usage if we're sure the request did not come from Enplug's server.
    // This is necessary to limit the influence of 3rd party websites which post messages multiple times per second.
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _getIterator3.default)(WHITELIST), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var whitelistedUrl = _step2.value;

        if (event.origin.startsWith(whitelistedUrl)) {
          console.log('[Player SDK: ' + VERSION + '] Received message from ' + event.origin, event);
          epBridge.receive(event.data);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });
}

/*eslint no-implicit-globals: "off", no-unused-vars: "off" */
// global fn for Java bridge to call
epBridge.receive = function (json) {
  try {
    var data = {};

    if (typeof json === 'string') {
      data = JSON.parse(json);
    } else {
      data = json;
    }

    var isReload = data.action === 'reload';
    var isError = data.action === 'error';
    var service = data.service;
    var action = data.action;
    var payload = data.payload || {};
    var meta = data.meta || {};
    var token = data.token;

    console.log('[Player SDK: ' + VERSION + '] Received message with action ' + action, data);

    // if there is a token we can just resolve the promise and be done
    // if it was an error the payload has been transformed to an error
    //    so we can just reject the promise with that error
    if (token && responseMap.has(token)) {
      var responseFunctions = responseMap.get(token);
      responseFunctions[isError ? 1 : 0](payload);
      responseMap.delete(token);
      return;
    }

    // todo make this less weird (not hacky)
    // if we pass more info in the payload this will
    // need to be changed to not throw that data away
    if (isError) {
      console.log('[Player SDK: ' + VERSION + '] Error received: ' + payload.message, payload);
      // tweak payload to be the error object
      payload = new _EnplugError2.default(payload.message || '');
    }

    if (isReload) {
      console.log('[Player SDK: ' + VERSION + '] App reload requested.');
      window.location.reload();
      return;
    }

    // this is for any "public" event (these are consumed by third parties)
    if (service === 'event') {
      (0, _events.processEvent)(action, payload, meta);
    }
  } catch (err) {
    console.error('[Player SDK: ' + VERSION + '] Error receiving and processing message in _epBridge.receive');
    console.error(err.stack);
  }

  // todo add message that call wasn't handled?
};

/**
 *  @module enplug.bridge
 */
exports.default = {
  /*eslint consistent-return: "off"*/
  /**
   * The function for sending messages to the Java layer
   *
   * @param {object} message -- the object containing the required message parameters
   * @param {string} message.service -- the service this call belongs to
   * @param {string} message.action -- the action being preformed on this service
   * @param {object} [message.payload] -- any data required for the action being performed
   * @param {object} [message.meta] -- not currently used for anything
   * @param {boolean} [noReturn=false] -- send true to skip adding a token and returning a promise
   * @returns {Promise|undefined}
   */
  send: function send(message) {
    var noReturn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var msg = (0, _extends3.default)({
      isNewSdk: true
    }, message);
    var url = window.location.href;

    console.log('[Player SDK: ' + VERSION + '] Sending message from URL ' + url);

    // appToken identifies specific instance of the App.
    var match = url.match(/apptoken=([^&]*[a-z|0-9])/);
    msg.appToken = match && match[1] || '';

    // We need to send app url with the message so that Web Player knows which application sent
    // a message.
    var queryIndex = url.indexOf('?');
    var appUrl = url.slice(0, queryIndex);
    msg.appUrl = appUrl;

    if (!msg.hasOwnProperty('service') || typeof msg.service !== 'string') {
      return _promise2.default.reject(new TypeError('[Player SDK: ' + VERSION + '] Bridge message requires a service property (string)'));
    }

    if (!msg.hasOwnProperty('action') || typeof msg.action !== 'string') {
      return _promise2.default.reject(new TypeError('[Player SDK: ' + VERSION + '] Bridge message requires an action property (string)'));
    }

    if (noReturn) {
      console.log('[Player SDK: ' + VERSION + '] Message to be sent (noReturn = true): ' + (0, _stringify2.default)(msg));
      epBridge.send((0, _stringify2.default)(msg));
      return;
    }

    return new _promise2.default(function (resolve, reject) {
      var token = createToken();
      responseMap.set(token, [resolve, reject]);
      msg.token = token;

      console.log('[Player SDK: ' + VERSION + '] Sending message from an App outside of Zoning: ' + (0, _stringify2.default)(msg), msg);
      epBridge.send((0, _stringify2.default)(msg));
    });
  },


  /**
   * A helper for creating a send function that automatically adds the "service" property
   * based on the original input.
   *
   * @param {string} service -- the service name to add to messages
   * @returns {SenderFunction} // todo typedef
   */
  senderForService: function senderForService(service) {
    var _this = this;

    return function () {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var noReturn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      message.service = service;
      return _this.send(message, noReturn);
    };
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(6);
var call = __webpack_require__(90);
var isArrayIter = __webpack_require__(91);
var anObject = __webpack_require__(5);
var toLength = __webpack_require__(25);
var getIterFn = __webpack_require__(47);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f;
var has = __webpack_require__(12);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processEvent = exports.eventProcessor = undefined;

var _eventEmitter = __webpack_require__(59);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _eventTransform = __webpack_require__(72);

var _eventTransform2 = _interopRequireDefault(_eventTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var events = (0, _eventEmitter2.default)(),
    eventProcessor = (0, _eventTransform2.default)();

function processEvent(eventName, payload, meta) {
  // eslint-disable-line
  var eventData = payload;

  if (eventProcessor.has(eventName)) {
    eventData = eventProcessor.runTransforms(eventName, payload);
  }

  events.dispatch(eventName, eventData);
}

exports.default = events;
exports.eventProcessor = eventProcessor;
exports.processEvent = processEvent;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(5);
var dPs = __webpack_require__(68);
var enumBugKeys = __webpack_require__(41);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(19)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(42).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(23);
var defined = __webpack_require__(24);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(13);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(40)('keys');
var uid = __webpack_require__(28);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(73);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(24);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(83)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(32)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(45);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(84);
var hide = __webpack_require__(7);
var has = __webpack_require__(12);
var Iterators = __webpack_require__(15);
var $iterCreate = __webpack_require__(85);
var setToStringTag = __webpack_require__(17);
var getPrototypeOf = __webpack_require__(86);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
var global = __webpack_require__(0);
var hide = __webpack_require__(7);
var Iterators = __webpack_require__(15);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(13);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(7);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(69);
var enumBugKeys = __webpack_require__(41);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ }),
/* 44 */
/***/ (function(module, exports) {



/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(34);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(15);
module.exports = __webpack_require__(1).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(5);
var aFunction = __webpack_require__(10);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(6);
var invoke = __webpack_require__(92);
var html = __webpack_require__(42);
var cel = __webpack_require__(19);
var global = __webpack_require__(0);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(13)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(36);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var dP = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(9);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(28)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(12);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(56);

var _app2 = _interopRequireDefault(_app);

var _dashboard = __webpack_require__(121);

var _dashboard2 = _interopRequireDefault(_dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var isDashboard = window.location.search.indexOf('dashboard') > -1;
  var runner = isDashboard ? _dashboard2.default : _app2.default;
  runner.start();
});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _playerSdk = __webpack_require__(57);

var _playerSdk2 = _interopRequireDefault(_playerSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tickIntervalSeconds = 1;

var count = 0;
var updateTimeout = void 0;
var tickCounter = void 0;

function tick() {
  count++;

  // I thought that this was because we never got the next asset, and had the player
  // display 1 asset, so I am attempting to get the next one every 10 ticks to trigger
  // the player to change.  It does not seem to have an effect.
  if (count % 10 === 0) {
    _playerSdk2.default.assets.getNext();
  }

  tickCounter.innerText = count + "";
  updateTimeout = setTimeout(tick, tickIntervalSeconds * 1000);
}

var app = {
  start: function start() {
    tickCounter = document.getElementById('tick-count');
    document.getElementById('app').style.display = 'block';

    // I had thought that setting the interval here was what was causing the app to stay on
    // the screen indefinitely, but commenting out this line (so that the interval is never set)
    // has no effect.
    tick();

    _playerSdk2.default.appStatus.start();

    // just to be safe...
    _playerSdk2.default.appStatus.setCanInterrupt(true);
  }
};

exports.default = app;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*eslint-env node*/
 //eslint-disable-line

var enplug = __webpack_require__( 58 );

// the named exports are doubled on the default
// so exporting just the default for node works fine
module.exports = enplug.default;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playRecorder = exports.assets = exports.settings = exports.appStatus = exports.notifications = undefined;

var _events = __webpack_require__(18);

var _events2 = _interopRequireDefault(_events);

var _notifications = __webpack_require__(79);

var _notifications2 = _interopRequireDefault(_notifications);

var _status = __webpack_require__(117);

var _status2 = _interopRequireDefault(_status);

var _settings = __webpack_require__(118);

var _settings2 = _interopRequireDefault(_settings);

var _assets = __webpack_require__(119);

var _assets2 = _interopRequireDefault(_assets);

var _playRecorder = __webpack_require__(120);

var _playRecorder2 = _interopRequireDefault(_playRecorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enplug = {
  on: _events2.default.on,
  once: _events2.default.once,
  off: _events2.default.off,
  notifications: _notifications2.default,
  appStatus: _status2.default,
  settings: _settings2.default,
  assets: _assets2.default,
  playRecorder: _playRecorder2.default
};

exports.default = enplug;
exports.notifications = _notifications2.default;
exports.appStatus = _status2.default;
exports.settings = _settings2.default;
exports.assets = _assets2.default;
exports.playRecorder = _playRecorder2.default;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isInteger = __webpack_require__(60);

var _isInteger2 = _interopRequireDefault(_isInteger);

var _create = __webpack_require__(20);

var _create2 = _interopRequireDefault(_create);

exports.default = function () {
  var instance,
      handlerMap = (0, _create2.default)(null),
      maxListeners = 10;

  /*eslint no-extra-parens: "off"*/
  return instance = {
    get maxListeners() {
      return maxListeners;
    },
    set maxListeners(newMax) {
      if (!(0, _isInteger2.default)(newMax)) {
        throw new TypeError('Max Listeners must be a valid Integer');
      }

      return maxListeners = newMax;
    },

    on: function on(eventName, handler) {
      typeCheckArgs(eventName, handler);

      // todo check max listeners
      if (eventName in handlerMap) {
        handlerMap[eventName].push(handler);
      } else {
        handlerMap[eventName] = [handler];
      }
    },
    once: function once(eventName, handler) {
      var _tmpFn;

      typeCheckArgs(eventName, handler);

      // todo maybe check max listeners

      _tmpFn = function tmpFn() {
        instance.off(eventName, _tmpFn);
        handler.apply(undefined, arguments);
      };

      return instance.on(eventName, _tmpFn);
    },
    off: function off(eventName, handler) {
      var handlerIndex = -1;

      typeCheckArgs(eventName, handler);

      if (eventName in handlerMap) {
        handlerIndex = handlerMap[eventName].indexOf(handler);
      }

      if (handlerIndex >= 0) {
        handlerMap[eventName].splice(handlerIndex, 1);
      }
    },
    dispatch: function dispatch(eventName, event) {
      if (!Object.hasOwnProperty.call(event, 'type')) {
        event.type = eventName;
      }

      if (eventName in handlerMap && Array.isArray(handlerMap[eventName])) {
        handlerMap[eventName].slice().forEach(function (handler) {
          return handler(event);
        });
      }
    }
  };
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeCheckArgs = function typeCheckArgs(eventName, handler) {
  if (eventName == null || typeof eventName !== 'string') {
    throw new TypeError('An event name is required to attach an event handler');
  }

  if (handler == null || typeof handler !== 'function') {
    throw new TypeError('A handler function is required for .on');
  }
};

/**
 * @typedef {object|function} Event
 * @property {string} type -- the name of this event (should match what was used to bind the handler)
 */

/**
 * The EventEmitter class used for enplug event handling
 * @typedef {object} EventEmitter
 * @property {number} maxListeners -- the maximum number of listeners that can be attached (not currently used)
 * @property {function} on -- used to bind event handlers by name
 * @property {function} once -- used to bind event handlers by name that are removed after the first event they see
 * @property {function} off -- used to unbind event handlers
 * @property {function} dispatch -- used to dispatch event data to the registered handlers
 */

/**
 * @returns {EventEmitter} -- a factory for creating an event emitter like object
 */

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
module.exports = __webpack_require__(1).Number.isInteger;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(3);

$export($export.S, 'Number', { isInteger: __webpack_require__(65) });


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(9) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(19)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67);
var $Object = __webpack_require__(1).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(21) });


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(5);
var getKeys = __webpack_require__(39);

module.exports = __webpack_require__(9) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(12);
var toIObject = __webpack_require__(22);
var arrayIndexOf = __webpack_require__(70)(false);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(22);
var toLength = __webpack_require__(25);
var toAbsoluteIndex = __webpack_require__(71);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(29);

var _extends3 = _interopRequireDefault(_extends2);

var _create = __webpack_require__(20);

var _create2 = _interopRequireDefault(_create);

exports.default = function () {
  var transformMap = (0, _create2.default)(null);

  /**
   * Returns true if eventName is in the transformMap
   * @param eventName
   * @returns {boolean}
   */
  function hasTransform(eventName) {
    return eventName in transformMap;
  }

  return {
    has: hasTransform,

    addTransform: function addTransform(eventName, transformFn) {
      if (!hasTransform(eventName)) {
        transformMap[eventName] = [];
      }

      return transformMap[eventName].push(transformFn) - 1;
    },
    removeTransform: function removeTransform(eventName, transformFn) {
      if (hasTransform(eventName)) {
        transformMap[eventName] = transformMap[eventName].filter(function (func) {
          return func !== transformFn;
        });
      }
    },
    runTransforms: function runTransforms(eventName, eventData) {
      if (!hasTransform(eventName)) {
        return eventData;
      }

      return transformMap[eventName].reduce(function (currData, transformFn) {
        return transformFn(currData) || currData;
      }, (0, _extends3.default)({}, eventData));
    }
  };
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(75);
module.exports = __webpack_require__(1).Object.assign;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(76) });


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(39);
var gOPS = __webpack_require__(77);
var pIE = __webpack_require__(78);
var toObject = __webpack_require__(30);
var IObject = __webpack_require__(23);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(11)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 77 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 78 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bridge = __webpack_require__(14);

var _bridge2 = _interopRequireDefault(_bridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notificationSender = _bridge2.default.senderForService('notification');

exports.default = {
  post: function post(message) {
    return notificationSender({
      action: 'post',
      payload: {
        message: message
      }
    }).then(function (payload) {
      return payload.notificationId;
    });
  }
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(1);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
__webpack_require__(31);
__webpack_require__(33);
__webpack_require__(89);
__webpack_require__(95);
__webpack_require__(96);
module.exports = __webpack_require__(1).Promise;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(24);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(21);
var descriptor = __webpack_require__(38);
var setToStringTag = __webpack_require__(17);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(12);
var toObject = __webpack_require__(30);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(88);
var step = __webpack_require__(46);
var Iterators = __webpack_require__(15);
var toIObject = __webpack_require__(22);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(32)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(45);
var global = __webpack_require__(0);
var ctx = __webpack_require__(6);
var classof = __webpack_require__(34);
var $export = __webpack_require__(3);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(10);
var anInstance = __webpack_require__(35);
var forOf = __webpack_require__(16);
var speciesConstructor = __webpack_require__(48);
var task = __webpack_require__(49).set;
var microtask = __webpack_require__(93)();
var newPromiseCapabilityModule = __webpack_require__(36);
var perform = __webpack_require__(50);
var promiseResolve = __webpack_require__(51);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(37)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(17)($Promise, PROMISE);
__webpack_require__(52)(PROMISE);
Wrapper = __webpack_require__(1)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(94)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(15);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 92 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var macrotask = __webpack_require__(49).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(13)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3);
var core = __webpack_require__(1);
var global = __webpack_require__(0);
var speciesConstructor = __webpack_require__(48);
var promiseResolve = __webpack_require__(51);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(36);
var perform = __webpack_require__(50);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(98), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(31);
module.exports = __webpack_require__(99);


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var get = __webpack_require__(47);
module.exports = __webpack_require__(1).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
__webpack_require__(31);
__webpack_require__(33);
__webpack_require__(102);
__webpack_require__(109);
__webpack_require__(112);
__webpack_require__(114);
module.exports = __webpack_require__(1).Map;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(103);
var validate = __webpack_require__(54);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(104)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(8).f;
var create = __webpack_require__(21);
var redefineAll = __webpack_require__(37);
var ctx = __webpack_require__(6);
var anInstance = __webpack_require__(35);
var forOf = __webpack_require__(16);
var $iterDefine = __webpack_require__(32);
var step = __webpack_require__(46);
var setSpecies = __webpack_require__(52);
var DESCRIPTORS = __webpack_require__(9);
var fastKey = __webpack_require__(53).fastKey;
var validate = __webpack_require__(54);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(0);
var $export = __webpack_require__(3);
var meta = __webpack_require__(53);
var fails = __webpack_require__(11);
var hide = __webpack_require__(7);
var redefineAll = __webpack_require__(37);
var forOf = __webpack_require__(16);
var anInstance = __webpack_require__(35);
var isObject = __webpack_require__(4);
var setToStringTag = __webpack_require__(17);
var dP = __webpack_require__(8).f;
var each = __webpack_require__(105)(0);
var DESCRIPTORS = __webpack_require__(9);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(6);
var IObject = __webpack_require__(23);
var toObject = __webpack_require__(30);
var toLength = __webpack_require__(25);
var asc = __webpack_require__(106);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(107);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(108);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(13);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(3);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(110)('Map') });


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(34);
var from = __webpack_require__(111);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(16);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(113)('Map');


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(3);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(115)('Map');


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(3);
var aFunction = __webpack_require__(10);
var ctx = __webpack_require__(6);
var forOf = __webpack_require__(16);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(20);

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A Constructor for creating "EnplugError" objects
 * @param {string} message -- the message for this error
 * @constructor
 */
function EnplugError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  this.message = message;

  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  }
}

// properly set up prototype as an Error subclass
EnplugError.prototype = (0, _create2.default)(Error.prototype, {
  constructor: {
    value: EnplugError,
    writeable: true,
    configurable: true
  },
  name: {
    value: 'EnplugError',
    writeable: true,
    configurable: true
  }
});

// export the constructor
exports.default = EnplugError;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(43);

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = __webpack_require__(29);

var _extends3 = _interopRequireDefault(_extends2);

var _bridge = __webpack_require__(14);

var _bridge2 = _interopRequireDefault(_bridge);

var _events = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATES = {
  ERROR: 'error',
  START: 'start',
  //    READY: 'ready',
  HIDE: 'hide',
  FINISHED: 'finished',
  //    RENDER: 'render',
  TRANSITION: 'transition'
},
    statusSender = _bridge2.default.senderForService('status');

// module local vars
var sendStateAction,
    createDoneCB,
    canInterrupt = true;

// internal helper for sending state update messages
sendStateAction = function sendStateAction(newState) {
  return statusSender({
    action: newState
  }).then(function (payload) {
    return payload.success || null;
  });
};

createDoneCB = function createDoneCB() {
  return function done() {
    statusSender({
      action: 'destroy-finished'
    }, true);
  };
};

// add event transform for destroy event
_events.eventProcessor.addTransform('destroy', function (eventData) {
  return (0, _extends3.default)(createDoneCB(), eventData);
});

// appStatus API
exports.default = {
  get STATES() {
    return STATES;
  },

  start: function start() {
    return sendStateAction(STATES.START);
  },
  error: function error() {
    return sendStateAction(STATES.ERROR);
  },
  hide: function hide() {
    return sendStateAction(STATES.HIDE);
  },
  transition: function transition() {
    return sendStateAction(STATES.TRANSITION);
  },


  get canInterrupt() {
    return _promise2.default.resolve(canInterrupt);
  },

  setCanInterrupt: function setCanInterrupt(newValue) {
    if (typeof newValue !== 'boolean') {
      return _promise2.default.reject(new TypeError('[Enplug SDK] You can only set canInterrupt to a boolean value'));
    }

    // optimistic update
    canInterrupt = newValue;

    return statusSender({
      action: 'set-interrupt',
      payload: {
        canInterrupt: newValue
      }
    }).catch(function (error) {
      canInterrupt = !newValue;
      throw error;
    }).then(function () {
      return canInterrupt;
    });
  }
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bridge = __webpack_require__(14);

var _bridge2 = _interopRequireDefault(_bridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// todo populate from Java?
var TRANSITIONS = {
  SLIDE_LEFT: 'SLIDE_LEFT',
  SLIDE_RIGHT: 'SLIDE_RIGHT',
  SLIDE_DOWN: 'SLIDE_DOWN',
  SLIDE_UP: 'SLIDE_UP',
  FADE: 'FADE',
  NONE: 'NONE'
},
    settingsSender = _bridge2.default.senderForService('settings');

var is4KCache = null;

// settings API
exports.default = {
  get TRANSITIONS() {
    return TRANSITIONS;
  },

  get is4K() {
    if (is4KCache != null) {
      return is4KCache;
    }

    return is4KCache = settingsSender({
      action: 'is4K'
    }).then(function (payload) {
      console.log('[Player SDK] Settings: Returning setting is4k: ' + (payload && payload.value));
      return payload && payload.value ? payload.value : false;
    });
  },

  // todo cache this
  // if I'm remembering right when this changes the whole player is restarted
  // so it is safe to assume this will not change at run-time
  get transitionType() {
    return settingsSender({
      action: 'transition-type'
    }).then(function (payload) {
      console.log('[Player SDK] Settings: Returning setting transition: ' + (payload && payload.value));
      return payload && payload.value ? payload.value : TRANSITIONS.NONE;
    });
  },

  hideWhitelabel: function hideWhitelabel() {
    return settingsSender({
      action: 'hide-whitelabel'
    }).then(function (payload) {
      console.log('[Player SDK] Settings: Returning setting hide whitelabel: ' + (payload && payload.success));
      return payload && payload.success ? payload.success : true;
    });
  },


  get whitelabel() {
    return settingsSender({
      action: 'get-whitelabel'
    }).then(function (payload) {
      console.log('[Player SDK] Settings: Returning setting whitelabel: ' + (payload && payload.value));
      return payload && payload.value ? payload.value : '';
    });
  },

  get deviceId() {
    return settingsSender({
      action: 'get-deviceid'
    }).then(function (payload) {
      console.log('[Player SDK] Settings: Returning setting deviceId: ' + (payload && payload.value));
      return payload && payload.value ? payload.value : '';
    });
  },

  get locale() {
    return settingsSender({
      action: 'get-locale'
    }).then(function (payload) {
      console.log('[Player SDK] Settings: Returning setting get-locale: ' + (payload && payload.value));
      return payload && payload.value ? payload.value : 'en';
    });
  },

  get orientation() {
    return settingsSender({
      action: 'get-orientation'
    }).then(function (payload) {
      console.log('[Player SDK] Settings: Returning setting get-orientation: ' + (payload && payload.value));
      return payload && payload.value;
    });
  },

  get zoning() {
    return settingsSender({
      action: 'get-zoning-info'
    }).then(function (payload) {
      console.log('[Player SDK] Settings: Returning setting get-zoning-info: ' + (payload && payload.value));
      return payload && payload.value;
    });
  }
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bridge = __webpack_require__(14);

var _bridge2 = _interopRequireDefault(_bridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assetSender = _bridge2.default.senderForService('asset');

exports.default = {
  getNext: function getNext() {
    return assetSender({
      action: 'get-next'
    });
  },
  getAsset: function getAsset() {
    return assetSender({
      action: 'get-asset'
    });
  },
  getList: function getList() {
    return assetSender({
      action: 'get-list'
    });
  },
  getTheme: function getTheme() {
    return assetSender({
      action: 'get-theme'
    });
  }
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bridge = __webpack_require__(14);

var _bridge2 = _interopRequireDefault(_bridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var playRecSender = _bridge2.default.senderForService('play-recorder');

// note play duration is in seconds
exports.default = {
  report: function report(assetId, referenceId, playDuration) {
    var additionalInfo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    var payload = {
      assetId: assetId,
      referenceId: referenceId,
      playDuration: playDuration
    };

    if (additionalInfo !== '') {
      payload.additionalInfo = additionalInfo;
    }

    playRecSender({
      action: 'report',
      payload: payload
    }, true);

    // todo should this actually return something?
  }
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(122);

var elem = document.getElementById('status');

var _window = window,
    enplug = _window.enplug;


function triggerSave() {
  // save a dummy asset so we get the save
  // dialog and can deploy to display groups
  var asset = {
    Created: new Date(),
    Value: {},
    VenueIds: []
  };
  return enplug.account.saveAsset(asset, {
    loadingMessage: 'Saving changes...',
    successMessage: 'Changes saved',
    showDeployDialog: true
  });
}

function setButtons() {
  var button = {
    text: 'Deploy to Displays',
    class: 'btn btn-primary',
    action: triggerSave,
    disabled: false
  };
  enplug.dashboard.setHeaderButtons(button);
}

function start() {
  document.getElementById('dashboard').style.display = 'block';
  setButtons();
  enplug.dashboard.pageLoading(false);
}

var dashboard = {
  start: start
};

exports.default = dashboard;

/***/ }),
/* 122 */
/***/ (function(module, exports) {

!function(a){"use strict";a.enplug={debug:!1,classes:{},noop:function(){}}}(window),function(a){"use strict";function b(b,d){function e(b){a.debug&&(arguments[0]=c+arguments[0],console.log.apply(console,arguments))}function f(b){if(b.successCallback&&"function"!=typeof b.successCallback)throw new Error(c+"Success callback must be a function.");if(b.successCallback=b.successCallback||a.noop,b.errorCallback&&"function"!=typeof b.errorCallback)throw new Error(c+"Error callback must be a function.");b.errorCallback=b.errorCallback||a.noop}function g(a){try{var b=JSON.parse(a.data);return b.namespace===d&&"boolean"==typeof b.success&&b}catch(c){}return!1}this.callId=0,this.pendingCalls={},this.namespace=d,this.send=function(a){if(a.name){a.callId=++this.callId,a.namespace=d,a.transient=!!a.transient,a.persistent=!!a.persistent,f(a),e("Calling method:",a),a.transient||(this.pendingCalls[a.callId]=a);try{var g=JSON.stringify(a);b.parent.postMessage(g,"*")}catch(h){console.error(c+"Error:",h)}return a.callId}throw new Error(c+"All transport method calls must have a name.")},this.handleEvent=function(a){if("message"===a.type){var b=g(a);if(b){var c=this.pendingCalls[b.callId];if(c)return c.persistent||delete this.pendingCalls[b.callId],e("Calling method "+(b.success?"success":"error")+" callback:",{call:c,response:b}),(b.success?c.successCallback:c.errorCallback)(b.data),!0}}return!1},this.cleanup=function(){b.removeEventListener("message",this,!1)},b.addEventListener("message",this,!1)}var c="[Enplug SDK] ";b.prototype.TAG=c,a.classes.Transport=b}(window.enplug),function(a,b){"use strict";function c(c){if(!c)throw new Error(b.classes.Transport.prototype.TAG+"Senders must specify a method prefix.");this.prefix=c,this.novalidate=!1,this.transport=new b.classes.Transport(a,c)}c.prototype={validate:function(a,b,c){if(!(this.novalidate||null!=a&&("array"===b?Array.isArray(a):typeof a===b)))throw new Error(this.transport.TAG+c)},method:function(a){if("object"==typeof a)return a.name=this.prefix+"."+a.name,this.transport.send(a);throw new Error("Transport options must be an object.")},cleanup:function(){this.transport.cleanup()}},b.classes.Sender=c}(window,window.enplug),function(a){"use strict";function b(){a.classes.Sender.call(this,"app"),this.getAccount=function(a,b){return this.method({name:"getAccount",successCallback:a,errorCallback:b})},this.getUser=function(a,b){return this.method({name:"getUser",successCallback:a,errorCallback:b})},this.getDisplayGroups=function(a,b){return this.method({name:"getDisplays",successCallback:a,errorCallback:b})},this.getSelectedDisplayId=function(a,b){return this.method({name:"getSelectedDisplayId",successCallback:a,errorCallback:b})},this.getAssets=function(a,b){return this.method({name:"getAssets",successCallback:a,errorCallback:b})},this.bulkCreateAssets=function(a,b,c,d){var e={assets:a,dialogOptions:b||{}};return this.validate(e.assets,"array","You must provide an array of assets (object) when creating new assets."),this.validate(e.assets[0],"object","You must provide an array of assets (object) when creating new assets."),e.assets[0]&&this.validate(e.assets[0].Value,"object","You must provide a Value (object) when creating an asset."),this.method({name:"bulkCreateAssets",params:e,successCallback:c,errorCallback:d})},this.bulkDeployAssets=function(a,b,c,d){var e={assets:a,dialogOptions:b||{}};return this.validate(e.assets,"array","You must provide an array of assets (object) when deploying assets."),this.validate(e.assets[0],"object","You must provide an array of assets (object) when deploying assets."),e.assets[0]&&(this.validate(e.assets[0].Value,"object","You must provide a Value (object) when deploying an asset."),this.validate(e.assets[0].Id,"string","You must provide the ID (string) on the asset you want to update.")),this.method({name:"bulkDeployAssets",params:e,successCallback:c,errorCallback:d})},this.saveAsset=function(a,b,c,d){this.validate(a,"object","You must provide an asset object to save.");var e={asset:a,dialogOptions:b||{}};return this.method({name:"saveAsset",params:e,successCallback:c,errorCallback:d})},this.updateAssetOrder=function(a,b,c){return this.validate(a,"array","You must provide an array of assets (or asset ids) in the new order."),this.method({name:"updateAssetOrder",params:{assets:a},successCallback:b,errorCallback:c})},this.deleteAsset=function(a,b,c){return Array.isArray(a)?(this.validate(a,"array","You must pass a single ID (string) or Array of asset IDs to be deleted."),this.validate(a[0],"string","You must provide at least one Asset ID (string) to be deleted.")):(this.validate(a,"string","You must provide the ID (string) of the asset to delete."),a=[a]),this.method({name:"deleteAsset",params:{ids:a},successCallback:b,errorCallback:c})},this.getDefaultAssets=function(a,b){return this.method({name:"getDefaultAssets",successCallback:a,errorCallback:b})},this.getThemes=function(a,b,c){return this.method({name:"getThemes",params:{appId:a},successCallback:b,errorCallback:c})},this.getTheme=function(a,b,c){return this.method({name:"getTheme",params:{id:a},successCallback:b,errorCallback:c})},this.editTheme=function(a,b,c,d,e,f,g,h){return this.validate(a,"object","You must provide the theme definition (object)."),this.validate(c,"string","You must provide the preview url (string)."),this.method({name:"editTheme",params:{themeDefinition:a,theme:b,previewUrl:c,previewAsset:d,layout:e,fonts:f},successCallback:g,errorCallback:h})},this.saveTheme=function(a,b,c){return this.validate(a,"object","You must provide the theme (object) to save."),this.validate(a.Value,"object","You must provide the theme.Value (object) to save."),this.method({name:"saveTheme",params:{theme:a},successCallback:b,errorCallback:c})},this.deleteTheme=function(a,b,c){return this.validate(a,"string","You must provide the ID (string) of the theme to remove."),this.method({name:"deleteTheme",params:{themeId:a},successCallback:b,errorCallback:c})},this.getDisplay=this.getDisplayGroups,this.getDisplays=this.getDisplayGroups,this.getDisplayGroup=this.getDisplayGroups}b.prototype=Object.create(a.classes.Sender.prototype),a.classes.AccountSender=b,a.account=new b}(window.enplug),function(a,b){"use strict";function c(){function c(){return g.click(),!0}a.classes.Sender.call(this,"dashboard");var d=[],e=function(){},f=!0;this.setHeaderTitle=function(a,b,c){return this.validate(a,"string","Header title must be a string."),this.method({name:"set.title",params:a,successCallback:b,errorCallback:c})},this.setDisplaySelectorCallback=function(a,b){return this.validate(a,"function","To enable the display selector in the page title you must supply a callback function."),e=a,this.method({name:"set.selectorCallback",params:a,persistent:!0,successCallback:function(a){return"function"==typeof e&&void 0!==a&&e(a),a},errorCallback:b})},this.setDisplaySelectorVisibility=function(a,b,c){return this.validate(a,"boolean","Setting the display selector visibility requires a boolean argument, true to show or false to hide."),this.method({name:"set.selectorEnabled",params:a,successCallback:b,errorCallback:c})},this.switchToView=function(a,b,c,d){var e={displayGroupId:a,displayGroupName:b};return this.method({name:"switchToView",params:e,successCallback:c,errorCallback:d})},this.setHeaderButtons=function(a,b,c){this.validate(a,"object","Header buttons must be an object (single) or array (multiple)."),d=[],a=Array.isArray(a)?a:[a];for(var e=0;e<a.length;e++){var f=a[e];this.validate(f,"object","Header buttons must be objects."),f&&(this.validate(f.action,"function","Header buttons must have an action (function)."),f.id="button-"+Math.round(9999*Math.random()+1),d[f.id]=f)}return this.method({name:"set.buttons",params:a,persistent:!0,successCallback:function(a){if(a){var c=d[a.id];c?c.action():console.warn("Unrecognized button click:",a)}"function"==typeof b&&b(a)},errorCallback:c})},this.pageLoading=function(a,b,c){return this.validate(a,"boolean","Page loading status must be a boolean."),this.method({name:"page.loading",params:a,successCallback:function(){f=a,"function"==typeof b&&b(f)},errorCallback:c})},this.isLoading=function(){return f},this.pageError=function(a,b){return this.method({name:"page.error",successCallback:a,errorCallback:b})},this.pageNotFound=function(a,b){return this.method({name:"page.notFound",successCallback:a,errorCallback:b})},this.loadingIndicator=function(a,b,c){return this.validate(a,"string","Loading indicator requires a loading message (string)"),this.method({name:"indicator.loading",params:a,successCallback:b,errorCallback:c})},this.successIndicator=function(a,b,c){return this.validate(a,"string","Success indicator requires a success message (string)"),this.method({name:"indicator.success",params:a,successCallback:b,errorCallback:c})},this.errorIndicator=function(a,b,c){return this.validate(a,"string","Error indicator requires an error message (string)"),this.method({name:"indicator.error",params:a,successCallback:b,errorCallback:c})},this.openConfirm=function(a,b,c){return this.validate(a,"object","Confirm box requires options to be set (object)."),a&&(this.validate(a.title,"string","Confirm box requires options.title to be set (string)."),this.validate(a.text,"string","Confirm box requires options.text to be set (string).")),this.method({name:"confirm",params:a,successCallback:b,errorCallback:c})},this.confirmUnsavedChanges=function(a,b){return this.method({name:"unsavedChanges",successCallback:a,errorCallback:b})},this.navigate=function(a,b,c){return this.method({name:"navigate",params:{url:a},successCallback:b,errorCallback:c})},this.preview=function(a,b,c,d,e,f){return this.method({name:"preview",params:{url:a,asset:b,theme:c,layout:d},successCallback:e,errorCallback:f})},this.upload=function(a,b,c){return this.method({name:"upload",params:a,successCallback:b,errorCallback:c})},this.cleanup=function(){b.removeEventListener("click",c,!1),a.classes.Sender.prototype.cleanup.call(this)},this.click=function(){return this.method({name:"click",transient:!0})};var g=this;b.addEventListener("click",c,!1)}c.prototype=Object.create(a.classes.Sender.prototype),a.classes.DashboardSender=c,a.dashboard=new c}(window.enplug,document),function(a,b){"use strict";function c(b,c,d){var e=d.send;d.send=function(f){var g=b.defer(),h=f.successCallback||a.noop,i=f.errorCallback||a.noop;return f.successCallback=function(a){c.$apply(function(){g.resolve(a),h(a)})},f.errorCallback=function(a){c.$apply(function(){g.reject(a),i(a)})},e.call(d,f),g.promise}}function d(a){return function(a){return function(d,e){var f=a.charAt(0).toUpperCase()+a.slice(1)+"Sender",g=new b.classes[f];return b[a].cleanup(),b[a]=g,c(d,e,g.transport),g}}(a)}if(a){var e=a.module("enplug.sdk",[]);e.factory("$enplugDashboard",["$q","$rootScope",d("dashboard")]),e.factory("$enplugAccount",["$q","$rootScope",d("account")])}}(window.angular,window.enplug);

/***/ })
/******/ ]);