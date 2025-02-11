/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nclass Persona{\r\n    constructor(nombre, edad){\r\n        this.nombre = nombre;\r\n        this.edad = edad;\r\n    }\r\n    saludar(){\r\n        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);\r\n    }\r\n\r\n    async obtenerDatos(){\r\n        const info = await fetch('https://jsonplaceholder.typicode.com/users/1');\r\n        const datos = await info.json();\r\n        return datos.name;\r\n    }\r\n}\r\n\r\nconst miPersona = new Persona('Juan', 30);\r\nconst {nombre, edad} = persona;\r\n\r\nconst saludoFlecha = () => {\r\n    console.log(`Hola, soy ${nombre} y tengo ${edad} años`);\r\n}\r\n\r\nconsole.log(persona.saludo); \r\nconsole.log(saludoFlecha());\r\npersona.obtenerDatos().then(info=>console.log(\"Información que me ha devuelto la página\", info));\n\n//# sourceURL=webpack://polyfill/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/index.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;