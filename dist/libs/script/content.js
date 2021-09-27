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

/***/ "./src/libs/content.ts":
/*!*****************************!*\
  !*** ./src/libs/content.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\nvar autoInput = function autoInput(user) {\n  var userInputEle = document.querySelector('input[placeholder*=\"用户名\"]');\n\n  if (!userInputEle) {\n    userInputEle = document.querySelector('input[placeholder*=\"账户\"]');\n  }\n\n  var passWordInputEle = document.querySelector('input[placeholder*=\"密码\"]');\n  var validateInputEle = document.querySelector('input[placeholder*=\"验证码\"]');\n\n  if (userInputEle && passWordInputEle) {\n    var event = document.createEvent('HTMLEvents');\n    event.initEvent('input', false, true);\n    userInputEle.value = user.name;\n    passWordInputEle.value = user.passWord;\n    userInputEle.dispatchEvent(event);\n    passWordInputEle.dispatchEvent(event);\n  } else {\n    alert('不处于登录页面');\n  }\n};\n\nchrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {\n  if (request.key === 'clickUser') {\n    autoInput(request.info);\n  }\n});\n\n(function pageLoad() {\n  chrome.runtime.sendMessage({\n    key: 'pageLoad',\n    info: {\n      url: window.location.href\n    }\n  });\n})();\n\n//# sourceURL=webpack://easyswitch/./src/libs/content.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/libs/content.ts"](0, __webpack_exports__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});