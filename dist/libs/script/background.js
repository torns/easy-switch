/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/libs/background.ts":
/*!********************************!*\
  !*** ./src/libs/background.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\nvar index_1 = __webpack_require__(/*! ./utils/index */ \"./src/libs/utils/index.ts\");\n\nvar userStoragelist = {\n  test_sys: [{\n    auth: '测试',\n    id: 'NntBVSJKzWf',\n    name: '测试',\n    passWord: '123456'\n  }]\n};\nvar pageStorageInfoList = [{\n  id: 'sys_01',\n  key: 'test_sys',\n  title: '测试项目',\n  urls: ['www.test.com']\n}];\nvar userlist = {};\nvar pageInfoList = [];\nvar pageInfo = new Map();\nvar isDev = undefined;\nvar storage = {\n  pageInfoList: [],\n  userlist: {}\n};\nchrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {\n  if (data.key === 'pageLoad') {\n    var page;\n\n    if ((0, index_1.IsurlExait)(data.info.url, ['localhost'])) {\n      isDev = true;\n    } else {\n      isDev = false;\n    }\n\n    chrome.storage.local.get(storage, function (val) {\n      if (Object.keys(val.userlist).length === 0) {\n        chrome.storage.local.set({\n          userlist: userStoragelist\n        });\n        userlist = userStoragelist;\n      } else {\n        userlist = val.userlist;\n      }\n\n      if (val.pageInfoList.length === 0) {\n        chrome.storage.local.set({\n          pageInfoList: pageStorageInfoList\n        });\n        pageInfoList = pageStorageInfoList;\n      } else {\n        pageInfoList = val.pageInfoList;\n      }\n\n      pageInfoList.forEach(function (item) {\n        if ((0, index_1.IsurlExait)(data.info.url, item.urls)) {\n          page = item;\n        }\n      });\n\n      if (page) {\n        var _storage = _defineProperty({}, page.key, userlist[page.key]);\n\n        chrome.storage.local.set(_storage);\n        (0, index_1.getCurrentTabId)().then(function (id) {\n          page.id = id;\n          pageInfo.set(id, page);\n        });\n      }\n    });\n  }\n});\n\nfunction getPageInfo() {\n  return new Promise(function (reslove, reject) {\n    try {\n      chrome.storage.local.get(storage, function (val) {\n        return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n          var tabId, page;\n          return regeneratorRuntime.wrap(function _callee$(_context) {\n            while (1) {\n              switch (_context.prev = _context.next) {\n                case 0:\n                  userlist = val.userlist;\n                  pageInfoList = val.pageInfoList;\n                  _context.next = 4;\n                  return (0, index_1.getCurrentTabId)();\n\n                case 4:\n                  tabId = _context.sent;\n                  page = pageInfo.get(tabId);\n\n                  if (page) {\n                    reslove({\n                      isDev: isDev,\n                      page: page,\n                      pageInfoList: val.pageInfoList,\n                      userlist: val.userlist[page.key]\n                    });\n                  } else {\n                    reslove({\n                      isDev: isDev,\n                      pageInfoList: val.pageInfoList,\n                      userlist: [],\n                      page: null\n                    });\n                  }\n\n                case 7:\n                case \"end\":\n                  return _context.stop();\n              }\n            }\n          }, _callee);\n        }));\n      });\n    } catch (error) {\n      reject(error);\n    }\n  });\n}\n\n//# sourceURL=webpack://easyswitch/./src/libs/background.ts?");

/***/ }),

/***/ "./src/libs/utils/chrome.ts":
/*!**********************************!*\
  !*** ./src/libs/utils/chrome.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.getCurrentTabId = void 0;\n\nvar getCurrentTabId = function getCurrentTabId() {\n  return new Promise(function (reslove, reject) {\n    try {\n      chrome.tabs.query({\n        active: true,\n        currentWindow: true\n      }, function (tabs) {\n        reslove(tabs.length ? tabs[0].id : null);\n      });\n    } catch (error) {\n      reject(error);\n    }\n  });\n};\n\nexports.getCurrentTabId = getCurrentTabId;\n\n//# sourceURL=webpack://easyswitch/./src/libs/utils/chrome.ts?");

/***/ }),

/***/ "./src/libs/utils/index.ts":
/*!*********************************!*\
  !*** ./src/libs/utils/index.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.createTips = exports.clearStore = exports.setStore = exports.getStoreKey = exports.injectCustomJs = exports.createRandomCode = exports.loadFile = exports.IsurlExait = exports.getCurrentTabId = exports.sendMessageToContentScript = void 0;\n\nvar postMessage_1 = __webpack_require__(/*! ./postMessage */ \"./src/libs/utils/postMessage.ts\");\n\nObject.defineProperty(exports, \"sendMessageToContentScript\", ({\n  enumerable: true,\n  get: function get() {\n    return postMessage_1.sendMessageToContentScript;\n  }\n}));\n\nvar inject_1 = __webpack_require__(/*! ./inject */ \"./src/libs/utils/inject.ts\");\n\nObject.defineProperty(exports, \"injectCustomJs\", ({\n  enumerable: true,\n  get: function get() {\n    return inject_1.injectCustomJs;\n  }\n}));\n\nvar chrome_1 = __webpack_require__(/*! ./chrome */ \"./src/libs/utils/chrome.ts\");\n\nObject.defineProperty(exports, \"getCurrentTabId\", ({\n  enumerable: true,\n  get: function get() {\n    return chrome_1.getCurrentTabId;\n  }\n}));\n\nvar store_1 = __webpack_require__(/*! ./store */ \"./src/libs/utils/store.ts\");\n\nObject.defineProperty(exports, \"getStoreKey\", ({\n  enumerable: true,\n  get: function get() {\n    return store_1.getStoreKey;\n  }\n}));\nObject.defineProperty(exports, \"setStore\", ({\n  enumerable: true,\n  get: function get() {\n    return store_1.setStore;\n  }\n}));\nObject.defineProperty(exports, \"clearStore\", ({\n  enumerable: true,\n  get: function get() {\n    return store_1.clearStore;\n  }\n}));\n\nvar util_1 = __webpack_require__(/*! ./util */ \"./src/libs/utils/util.ts\");\n\nObject.defineProperty(exports, \"IsurlExait\", ({\n  enumerable: true,\n  get: function get() {\n    return util_1.IsurlExait;\n  }\n}));\nObject.defineProperty(exports, \"createRandomCode\", ({\n  enumerable: true,\n  get: function get() {\n    return util_1.createRandomCode;\n  }\n}));\nObject.defineProperty(exports, \"loadFile\", ({\n  enumerable: true,\n  get: function get() {\n    return util_1.loadFile;\n  }\n}));\nObject.defineProperty(exports, \"createTips\", ({\n  enumerable: true,\n  get: function get() {\n    return util_1.createTips;\n  }\n}));\n\n//# sourceURL=webpack://easyswitch/./src/libs/utils/index.ts?");

/***/ }),

/***/ "./src/libs/utils/inject.ts":
/*!**********************************!*\
  !*** ./src/libs/utils/inject.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.injectCustomJs = void 0;\n\nvar injectCustomJs = function injectCustomJs(jsPath) {\n  jsPath = jsPath || 'libs/script/inject.js';\n  var temp = document.createElement('script');\n  if (!temp) return new Error('发生了错误');\n  temp.setAttribute('type', 'text/javascript');\n  temp.src = chrome.extension.getURL(jsPath);\n\n  temp.onload = function () {\n    if (temp.parentNode) {\n      temp.parentNode.removeChild(temp);\n    } else {\n      document.removeChild(temp);\n    }\n  };\n\n  document.head.appendChild(temp);\n};\n\nexports.injectCustomJs = injectCustomJs;\n\n//# sourceURL=webpack://easyswitch/./src/libs/utils/inject.ts?");

/***/ }),

/***/ "./src/libs/utils/postMessage.ts":
/*!***************************************!*\
  !*** ./src/libs/utils/postMessage.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.sendMessageToContentScript = void 0;\n\nvar sendMessageToContentScript = function sendMessageToContentScript(message, callback) {\n  chrome.tabs.query({\n    active: true,\n    currentWindow: true\n  }, function (tabs) {\n    chrome.tabs.sendMessage(Number(tabs[0].id), message, function (response) {\n      if (callback) callback(response);\n    });\n  });\n};\n\nexports.sendMessageToContentScript = sendMessageToContentScript;\n\n//# sourceURL=webpack://easyswitch/./src/libs/utils/postMessage.ts?");

/***/ }),

/***/ "./src/libs/utils/store.ts":
/*!*********************************!*\
  !*** ./src/libs/utils/store.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.clearStore = exports.setStore = exports.getStoreKey = void 0;\n\nvar getStoreKey = function getStoreKey(keys) {\n  return new Promise(function (resolve, reject) {\n    var store = {};\n    keys.forEach(function (x) {\n      store[x] = null;\n    });\n\n    try {\n      chrome.storage.local.get(store, function (rst) {\n        resolve(rst);\n      });\n    } catch (error) {\n      reject(error);\n    }\n  });\n};\n\nexports.getStoreKey = getStoreKey;\n\nvar setStore = function setStore(store) {\n  return new Promise(function (resolve, reject) {\n    try {\n      chrome.storage.local.set(store, function () {\n        resolve(true);\n      });\n    } catch (error) {\n      reject(error);\n    }\n  });\n};\n\nexports.setStore = setStore;\n\nvar clearStore = function clearStore() {\n  chrome.storage.local.clear();\n};\n\nexports.clearStore = clearStore;\n\n//# sourceURL=webpack://easyswitch/./src/libs/utils/store.ts?");

/***/ }),

/***/ "./src/libs/utils/util.ts":
/*!********************************!*\
  !*** ./src/libs/utils/util.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.createTips = exports.loadFile = exports.createRandomCode = exports.IsurlExait = void 0;\n\nvar IsurlExait = function IsurlExait(url, keys) {\n  var isExist = false;\n  keys.forEach(function (val) {\n    if (url.indexOf(val) >= 0) {\n      isExist = true;\n    }\n  });\n  return isExist;\n};\n\nexports.IsurlExait = IsurlExait;\n\nvar createRandomCode = function createRandomCode() {\n  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;\n  var charset = \"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\";\n  var maxLen = charset.length;\n  var ret = '';\n\n  for (var i = 0; i < len; i++) {\n    var randomIndex = Math.floor(Math.random() * maxLen);\n    ret += charset[randomIndex];\n  }\n\n  return ret;\n};\n\nexports.createRandomCode = createRandomCode;\n\nvar loadFile = function loadFile(fileName, content) {\n  var aLink = document.createElement('a');\n  var blob = new Blob([content], {\n    type: 'text/plain'\n  });\n  aLink.download = fileName;\n  aLink.href = URL.createObjectURL(blob);\n  aLink.click();\n  URL.revokeObjectURL(blob.toString());\n};\n\nexports.loadFile = loadFile;\n\nvar createTips = function createTips(message) {\n  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';\n  var tips = document.createElement('div');\n  tips.className = \"globl-tips \".concat(type);\n  tips.innerText = message;\n  document.body.appendChild(tips);\n  setTimeout(function () {\n    document.body.removeChild(tips);\n  }, 3000);\n};\n\nexports.createTips = createTips;\n\n//# sourceURL=webpack://easyswitch/./src/libs/utils/util.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/libs/background.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});