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

/***/ "./src/libs/options.ts":
/*!*****************************!*\
  !*** ./src/libs/options.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\nvar index_1 = __webpack_require__(/*! ./utils/index */ \"./src/libs/utils/index.ts\");\n\nvar storage = {\n  pageInfoList: [],\n  userlist: {}\n};\nvar userlist;\nvar pageInfoList = [];\n\nwindow.onload = function () {};\n\nvar systemContentEle = document.querySelector('.option-content');\n\nvar createSystemOption = function createSystemOption() {\n  var options = \"\";\n\n  if (pageInfoList.length === 0) {\n    options = \"<div class=\\\"system-option\\\">\\n      <div class=\\\"option-title\\\"><span>\\u5E73\\u53F0\\u4FE1\\u606F</span><span key='sys_add' class='operate-btn'>\\u6DFB\\u52A0</span></div></div>\";\n  }\n\n  pageInfoList.forEach(function (sys) {\n    var urlTemplate = '';\n    sys.urls.forEach(function (x) {\n      urlTemplate += \"<span class='url-item'>\".concat(x, \"</span>\");\n    });\n    var template = \"<div class=\\\"system-option\\\">\\n            <div class=\\\"option-title\\\"><span>\\u5E73\\u53F0\\u4FE1\\u606F</span><span key='sys_add' class='operate-btn'>\\u6DFB\\u52A0</span></div>\\n            <div class=\\\"system-info system-users-head\\\">\\n            <div class=\\\"system-title\\\">\\u540D\\u79F0</div>\\n            <div class=\\\"system-url\\\">\\u5E73\\u53F0url</div>\\n            <div class=\\\"system-key\\\">storageKey</div>\\n            <div class=\\\"operate-con\\\">\\n              \\u64CD\\u4F5C\\n            </div>\\n         </div>\\n            <div class=\\\"system-info\\\">\\n              <div class=\\\"system-title\\\">\".concat(sys.title, \"</div>\\n              <div class=\\\"system-url\\\">\").concat(urlTemplate, \"</div>\\n              <div class=\\\"system-key\\\">\").concat(sys.key, \"</div>\\n              <div class=\\\"operate-con\\\">\\n                <div key='sys_editor_key' sys_editor_key='\").concat(sys.id, \"' class='operate-btn'>\\u7F16\\u8F91</div>\\n                <div key='sys_delete' delete_key='\").concat(sys.key, \"' class='operate-btn operate-btn-error'>\\u5220\\u9664</div>\\n              </div>\\n           </div>\");\n    var userTemplate = \"<div class=\\\"system-users system-users-head\\\">\\n      <div class=\\\"users-id\\\">ID</div>\\n      <div class=\\\"users-name\\\">\\u8D26\\u53F7</div>\\n      <div class=\\\"user-password\\\">\\u5BC6\\u7801</div>\\n      <div class=\\\"user-auth\\\">\\u5907\\u6CE8</div>\\n      <div class=\\\"user-sort\\\">\\u6392\\u5E8F</div>\\n      <div class=\\\"operate-con\\\">\\n       \\u64CD\\u4F5C\\n      </div>\\n    </div>\";\n\n    if (userlist[sys.key] && userlist[sys.key].length > 0) {\n      userlist[sys.key].sort(function (a, b) {\n        return a.sort - b.sort;\n      }).forEach(function (user) {\n        userTemplate += \"<div class=\\\"system-users\\\">\\n              <div class=\\\"users-id\\\">\".concat(user.id, \"</div>\\n              <div class=\\\"users-name\\\">\").concat(user.name, \"</div>\\n              <div class=\\\"user-password\\\">******</div>\\n              <div class=\\\"user-auth\\\">\").concat(user.auth, \"</div>\\n              <div class=\\\"user-sort\\\">\").concat(user.sort, \"</div>\\n              <div class=\\\"operate-con\\\">\\n                <div key='user_editor_key' push_key='\").concat(sys.key, \"' user_editor_key='\").concat(user.id, \"' class='operate-btn'>\\u7F16\\u8F91</div>\\n                <div key='user_delete' delete_key='\").concat(sys.key, \"' delete_id='\").concat(user.id, \"' class='operate-btn operate-btn-error'>\\u5220\\u9664</div>\\n              </div>\\n            </div>\");\n      });\n    }\n\n    template += \"<div class=\\\"option-title-user\\\">\\u7528\\u6237\\u5E93<span key='user_add' push_key='\".concat(sys.key, \"' class='operate-btn'>\\u6DFB\\u52A0</span></div>\");\n    template = template + userTemplate + \"</div>\";\n    options += template;\n  });\n  console.log(options);\n  return options;\n};\n\nvar editorEle = undefined;\nchrome.storage.local.get(storage, function (val) {\n  userlist = val.userlist;\n  pageInfoList = val.pageInfoList;\n  console.log(val);\n  var eleOptions = createSystemOption();\n  console.log(systemContentEle);\n\n  if (systemContentEle) {\n    systemContentEle.innerHTML = eleOptions;\n  }\n});\nvar sysEditorConfig = [{\n  inputName: 'sys_name',\n  name: '平台名称',\n  placeholder: '请输入名称',\n  type: 'text'\n}, {\n  inputName: 'sys_url',\n  name: '平台url',\n  placeholder: '多个地址用英文逗号隔开',\n  type: 'text'\n}, {\n  inputName: 'sys_key',\n  name: 'key',\n  placeholder: '用作storageKey',\n  type: 'text'\n}];\nvar userEditorConfig = [{\n  inputName: 'user_name',\n  name: '用户名',\n  placeholder: '请输入用户名',\n  type: 'text'\n}, {\n  inputName: 'user_password',\n  name: '密码',\n  placeholder: '请输入密码',\n  type: 'text'\n}, {\n  inputName: 'user_auth',\n  name: '备注',\n  placeholder: '请输入',\n  type: 'text'\n}, {\n  inputName: 'user_sort',\n  name: '排序',\n  placeholder: '默认99',\n  type: 'number'\n}];\n\nvar createEditor = function createEditor(type, info, push_key) {\n  var config = type === 'sys' ? sysEditorConfig : userEditorConfig;\n  var parent = document.body;\n  if (editorEle) parent.removeChild(editorEle);\n  editorEle = document.createElement('div');\n  editorEle.className = 'editor';\n  var editorContent = '';\n  config.forEach(function (x) {\n    var value = info[x.inputName] || '';\n    editorContent += \"<div class=\\\"editor-item\\\">\\n                        <div class=\\\"editor-title\\\">\".concat(x.name, \"\\uFF1A</div>\\n                        <div class=\\\"editor-input\\\">\\n                          <input type='\").concat(x.type, \"' id='\").concat(x.inputName, \"' value='\").concat(value, \"' placeholder='\").concat(x.placeholder, \"'  class=\\\"editor-input-text\\\"/>\\n                        </div>\\n                        </div>\");\n  });\n  editorContent += \"<div class=\\\"editor-btn\\\">\\n                      <div key='editor_sure' editor_type='\".concat(type, \"' editor_id='\").concat(info.id, \"' push_key='\").concat(push_key, \"' class=\\\"operate-btn\\\">\\u786E\\u8BA4</div>\\n                      <div key='editor_cancel' editor_type='\").concat(type, \"' class=\\\"operate-btn operate-btn-info\\\">\\u53D6\\u6D88</div>\\n                      </div>\");\n  editorEle.innerHTML = editorContent;\n  parent.appendChild(editorEle);\n};\n\nif (systemContentEle) {\n  systemContentEle.addEventListener('click', function (e) {\n    if (editorEle) return;\n    if (!e.target) return;\n    var keyCode = e.target.getAttribute('key');\n    if (!keyCode) return;\n\n    if (keyCode === 'sys_add') {\n      createEditor('sys', {});\n    }\n\n    if (keyCode === 'user_add') {\n      var push_key = e.target.getAttribute('push_key');\n      createEditor('user', {}, push_key);\n    }\n\n    if (keyCode === 'user_delete') {\n      var delete_id = e.target.getAttribute('delete_id');\n      var delete_key = e.target.getAttribute('delete_key');\n\n      for (var i = 0; i < userlist[delete_key].length; i++) {\n        if (userlist[delete_key][i].id == delete_id) {\n          userlist[delete_key].splice(i, 1);\n          var eleOptions = createSystemOption();\n          systemContentEle.innerHTML = eleOptions;\n          chrome.storage.local.set({\n            userlist: userlist\n          });\n        }\n      }\n    }\n\n    if (keyCode === 'user_editor_key') {\n      var editor_key = e.target.getAttribute('user_editor_key');\n\n      var _push_key = e.target.getAttribute('push_key');\n\n      if (!_push_key) return;\n      var info = {};\n\n      userlist[_push_key].forEach(function (x) {\n        if (x.id == editor_key) {\n          info = {\n            id: x.id,\n            user_name: x.name,\n            user_password: x.passWord,\n            user_auth: x.auth,\n            user_sort: x.sort\n          };\n        }\n      });\n\n      createEditor('user', info, _push_key);\n    }\n\n    if (keyCode === 'sys_delete') {\n      var _delete_key = e.target.getAttribute('delete_key');\n\n      for (var _i = 0; _i < pageInfoList.length; _i++) {\n        if (pageInfoList[_i].key === _delete_key) {\n          pageInfoList.splice(_i, 1);\n          userlist[_delete_key] = [];\n\n          var _eleOptions = createSystemOption();\n\n          systemContentEle.innerHTML = _eleOptions;\n          chrome.storage.local.set({\n            pageInfoList: pageInfoList\n          });\n          chrome.storage.local.set({\n            userlist: userlist\n          });\n        }\n      }\n    }\n\n    if (keyCode === 'sys_editor_key') {\n      var _editor_key = e.target.getAttribute('sys_editor_key');\n\n      var _info = {};\n      pageInfoList.forEach(function (x) {\n        if (x.id == _editor_key) {\n          _info = {\n            id: x.id,\n            sys_name: x.title,\n            sys_url: x.urls,\n            sys_key: x.key\n          };\n        }\n      });\n      createEditor('sys', _info);\n    }\n  });\n}\n\ndocument.addEventListener('click', function (e) {\n  var _a, _b, _c;\n\n  var keyCode = e.target.getAttribute('key');\n\n  if (keyCode === 'editor_cancel') {\n    if (editorEle) {\n      document.body.removeChild(editorEle);\n      editorEle = undefined;\n    }\n  }\n\n  if (keyCode === 'editor_sure') {\n    var editorType = e.target.getAttribute('editor_type');\n    var editor_id = e.target.getAttribute('editor_id');\n    var push_key = e.target.getAttribute('push_key');\n\n    if (editorType === 'sys') {\n      var sys_name_value = (_a = document.querySelector('#sys_name')) === null || _a === void 0 ? void 0 : _a.value;\n      var sys_url_value = (_b = document.querySelector('#sys_url')) === null || _b === void 0 ? void 0 : _b.value;\n      var sys_key_value = (_c = document.querySelector('#sys_key')) === null || _c === void 0 ? void 0 : _c.value;\n\n      if (!sys_name_value || !sys_url_value || !sys_key_value) {\n        (0, index_1.createTips)('平台名称，平台url，平台key不能为空！', 'error');\n        return;\n      }\n\n      if (editor_id && editor_id !== 'undefined') {\n        pageInfoList.forEach(function (val) {\n          if (val.id == editor_id) {\n            val.title = sys_name_value;\n            val.key = sys_key_value;\n            val.urls = sys_url_value.split(',');\n          }\n        });\n      } else {\n        var exit = pageInfoList.find(function (x) {\n          return x.key === sys_key_value;\n        });\n\n        if (exit) {\n          (0, index_1.createTips)('平台key已经存在', 'error');\n          document.querySelector('#sys_key').value = '';\n          return;\n        }\n\n        pageInfoList.unshift({\n          id: (0, index_1.createRandomCode)(11),\n          title: sys_name_value,\n          key: sys_key_value,\n          urls: sys_url_value.split(',')\n        });\n      }\n\n      var eleOptions = createSystemOption();\n      systemContentEle.innerHTML = eleOptions;\n      chrome.storage.local.set({\n        pageInfoList: pageInfoList\n      });\n      document.querySelector('#sys_name').value = '';\n      document.querySelector('#sys_url').value = '';\n      document.querySelector('#sys_key').value = '';\n\n      if (editorEle) {\n        document.body.removeChild(editorEle);\n        editorEle = undefined;\n      }\n    }\n\n    if (editorType === 'user') {\n      var user_name_value = document.querySelector('#user_name').value;\n      var user_auth_value = document.querySelector('#user_auth').value;\n      var user_sort_value = document.querySelector('#user_sort').value;\n      var user_password_value = document.querySelector('#user_password').value;\n\n      if (!user_name_value || !user_password_value) {\n        (0, index_1.createTips)('账户，密码不能为空！', 'error');\n        return;\n      }\n\n      if (!push_key) return;\n\n      if (editor_id && editor_id !== 'undefined') {\n        userlist[push_key].forEach(function (val) {\n          if (val.id == editor_id) {\n            val.name = user_name_value;\n            val.passWord = user_password_value;\n            val.auth = user_auth_value || '-';\n            val.sort = Number(user_sort_value) || 99;\n          }\n        });\n      } else {\n        if (!userlist[push_key]) {\n          userlist[push_key] = [];\n        }\n\n        userlist[push_key].unshift({\n          id: (0, index_1.createRandomCode)(11),\n          name: user_name_value,\n          passWord: user_password_value,\n          auth: user_auth_value || '-',\n          sort: Number(user_sort_value) || 99\n        });\n      }\n\n      var _eleOptions2 = createSystemOption();\n\n      systemContentEle.innerHTML = _eleOptions2;\n      chrome.storage.local.set({\n        userlist: userlist\n      });\n\n      if (editorEle) {\n        document.body.removeChild(editorEle);\n        editorEle = undefined;\n      }\n    }\n  }\n});\nvar importFileEle = document.querySelector('.importFile');\nvar exportEle = document.querySelector('.export');\n\nif (importFileEle) {\n  importFileEle.addEventListener('change', function (e) {\n    if (!e.target) return;\n    var file = e.target.files[0];\n    e.target.value = '';\n    var reader = new FileReader();\n    reader.readAsText(file);\n\n    reader.onload = function (data) {\n      var config;\n\n      try {\n        config = JSON.parse(data.target.result);\n      } catch (error) {\n        (0, index_1.createTips)('请使用本插件导出配置文件', 'error');\n        return;\n      }\n\n      if (!config.key || config.key !== 'EasySwitch') {\n        (0, index_1.createTips)('请使用本插件导出配置文件', 'error');\n        return;\n      }\n\n      if (config.userlist) {\n        userlist = config.userlist;\n        chrome.storage.local.set({\n          userlist: config.userlist\n        });\n      }\n\n      if (config.pageInfoList) {\n        pageInfoList = config.pageInfoList;\n        chrome.storage.local.set({\n          pageInfoList: config.pageInfoList\n        });\n      }\n\n      var eleOptions = createSystemOption();\n      systemContentEle.innerHTML = eleOptions;\n      (0, index_1.createTips)('导入成功');\n    };\n  });\n}\n\nif (exportEle) {\n  exportEle.addEventListener('click', function () {\n    chrome.storage.local.get(storage, function (val) {\n      var data = {\n        key: 'EasySwitch',\n        version: '1.0.1',\n        userlist: val.userlist,\n        pageInfoList: val.pageInfoList\n      };\n      (0, index_1.loadFile)('config.json', JSON.stringify(data));\n    });\n  });\n}\n\n//# sourceURL=webpack://easyswitch/./src/libs/options.ts?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/libs/options.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});