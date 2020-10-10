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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/javascripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/javascripts/components/circle.js":
/*!*************************************************!*\
  !*** ./public/javascripts/components/circle.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./public/javascripts/components/util.js");



class Circle {
    constructor(opts) {
        this.pos = opts.pos;
        this.color = opts.color;
        this.rad = opts.rad;
        this.growSpeed = opts.growSpeed;
        this.maxRad = opts.maxRad;
        this.isGrowing = opts.isGrowing;
        this.area = Math.pow((opts.rad * Math.PI), 2)
    }

    draw (ctx) {
        // let grd = ctx.createRadialGradient(0, 50, 5, 90, 60, 100);
        // grd.addColorStop(0, "white" );
        // grd.addColorStop(1, this.color);
        var gradient = ctx.createLinearGradient(0, 0, 900, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = this.color;
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#c6d613";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ac13d6";
        // ctx.fillStyle = grid;
        // ctx.strokeStyle = '2px white';
        ctx.beginPath();
        ctx.arc(
            this.pos[0], 
            this.pos[1], 
            this.rad, 0, 2 * Math.PI, true
        );
        ctx.fill();
        ctx.stroke();
        
        
        // if (this.rad < this.maxRad) {
        //     this.rad += this.growSpeed;
        // }
    }

    hasCollided(oCirc) {  
        const centerDist = Object(_util__WEBPACK_IMPORTED_MODULE_0__["dist"])(
            this.pos[0], 
            this.pos[1], 
            oCirc.pos[0], 
            oCirc.pos[1]
            );
        
        return centerDist  < this.rad + oCirc.rad + 2;
    } 

    collideWith(object) {
   
    }

    grow() {
        if ((this.rad < this.maxRad) && (this.isGrowing === 0)) {
            this.rad += this.growSpeed;
        } else if (this.isGrowing === 2 && this.rad >= 1) {
            this.rad -= this.growSpeed;
        } else {
            this.rad = this.rad;
        }
    }
    render (ctx) {

    }

}

/* harmony default export */ __webpack_exports__["default"] = (Circle);

/***/ }),

/***/ "./public/javascripts/components/elements.js":
/*!***************************************************!*\
  !*** ./public/javascripts/components/elements.js ***!
  \***************************************************/
/*! exports provided: Levels, Gradients */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Levels", function() { return Levels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gradients", function() { return Gradients; });
const Levels = {
  1: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  2: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  3: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  4: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  5: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  6: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  7: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  8: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  9: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};


const Gradients = [
  "background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
  "background: radial-gradient(circle, rgba(174,238,237,1) 34%, rgba(148,163,233,1) 77%)",
  "background: linear-gradient(90deg, rgba(236,157,133,1) 0%, rgba(189,53,235,0.6797093837535014) 81%, rgba(241,246,255,0.6797093837535014) 100%)",
  "background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(45,253,120,0.8841911764705882) 100%)",
  "background: radial-gradient(circle, rgba(53,235,115,1) 0%, rgba(81,136,255,0.7945553221288515) 100%)",
  "background: radial-gradient(circle, rgba(238,174,235,0.7609418767507002) 34%, rgba(170,233,148,1) 77%)",
  "background: linear-gradient(0deg, rgba(195,103,34,1) 0%, rgba(85,45,253,0.8841911764705882) 100%)",
  "background: linear-gradient(0deg, rgba(34,195,143,0.8589810924369747) 0%, rgba(253,45,208,0.8841911764705882) 100%)",
  "background: linear-gradient(0deg, rgba(90,195,34,0.8589810924369747) 0%, rgba(144,45,253,0.8841911764705882) 100%)",
  "background: radial-gradient(circle, rgba(235,53,220,1) 0%, rgba(255,211,81,0.788953081232493) 100%)",
  "background: linear-gradient(90deg, rgba(180,180,58,1) 0%, rgba(200,29,253,0.9570203081232493) 50%, rgba(252,69,105,1) 100%)",
  "background: radial-gradient(circle, rgba(193,174,238,1) 34%, rgba(233,181,148,1) 77%)",
  "background: radial-gradient(circle, rgba(44,38,75,0.9850315126050421) 34%, rgba(193,20,63,1) 77%)",
];


/***/ }),

/***/ "./public/javascripts/components/enemy_circle.js":
/*!*******************************************************!*\
  !*** ./public/javascripts/components/enemy_circle.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _circle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./circle */ "./public/javascripts/components/circle.js");
/* harmony import */ var _friendly_circle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./friendly_circle */ "./public/javascripts/components/friendly_circle.js");



class enemyCircle extends _circle__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options) {
    super(options);
  }

  collideWith(object) {
    if (object instanceof _friendly_circle__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      this.isGrowing = 1;
    }
  }

  pauseGrowth(time) {
      this.isGrowing = 1;
      setInterval(() => (this.isGrowing = 0), time)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (enemyCircle);



/***/ }),

/***/ "./public/javascripts/components/friendly_circle.js":
/*!**********************************************************!*\
  !*** ./public/javascripts/components/friendly_circle.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _circle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./circle */ "./public/javascripts/components/circle.js");
/* harmony import */ var _enemy_circle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy_circle */ "./public/javascripts/components/enemy_circle.js");



class friendlyCircle extends _circle__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(options) {
        super(options) 
    }

    collideWith(object) {
        if (object instanceof _enemy_circle__WEBPACK_IMPORTED_MODULE_1__["default"]) {
            this.isGrowing = 1;
        } 
    }
    speedGrowth(time) {
        const oldSpeed = this.growSpeed;
      this.growSpeed *= 3;
      setInterval(() => (this.growSpeed = oldSpeed), time)

    }
}

/* harmony default export */ __webpack_exports__["default"] = (friendlyCircle);

/***/ }),

/***/ "./public/javascripts/components/game.js":
/*!***********************************************!*\
  !*** ./public/javascripts/components/game.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _friendly_circle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./friendly_circle */ "./public/javascripts/components/friendly_circle.js");
/* harmony import */ var _enemy_circle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy_circle */ "./public/javascripts/components/enemy_circle.js");




class Game {
    constructor() {
        this.enemyCircles = [];
        this.friendlyCircles = [];
        this.gameOver = false;
        this.levelStart = null;
        this.startTime = Date.now();
    }

    buildLevel(level) {
        for (let i = 0; i < level.length; i++) {
            for (let j = 0; j< level[0].length; j++) {
                if (level[i][j] === 1) {
                    let circleX = 65 * i;
                    let circleY = 65 * j;
                    let growSpeed = .1 +(Math.floor(Math.random() * 5) *.03);
                    let maxRad = Math.floor(Math.random() * 5) * 100 + 100;
                    let rad = Math.floor(Math.random() * 5) + 10;
                    let colors = [ '#c43e37', '#c45637', '#b37120', '#b32036', '#a68428']
                    let randomColor = colors[Math.floor(Math.random() * 4)]
                    const circle = new _enemy_circle__WEBPACK_IMPORTED_MODULE_1__["default"]({
                        pos: [circleX, circleY],
                        color: randomColor,
                        rad: rad,
                        growSpeed: growSpeed,
                        maxRad: maxRad,
                        isGrowing: 0,
                    })

                    this.enemyCircles.push(circle)

                } else if (level[i][j] === 2) {
                    let circleX = 65 * i;
                    let circleY = 65 * j;   
                    let growSpeed = .1+ (Math.floor(Math.random() * 5) * .03);
                    let maxRad = Math.floor(Math.random() * 5) * 100 + 100;
                    let rad = Math.floor(Math.random() * 5) + 10;
                    let colors = [ '#28a641', '#28a6a4', '#284aa6', '#41338f', '#1f6a87']
                    let randomColor = colors[Math.floor(Math.random() * 4)]
                    
                     const circle = new _friendly_circle__WEBPACK_IMPORTED_MODULE_0__["default"]({
                       pos: [circleX, circleY],
                       color: randomColor,
                       rad: rad,
                       growSpeed: growSpeed,
                       maxRad: maxRad,
                       isGrowing: 0,
                     });

                    this.friendlyCircles.push(circle);
                } 
            }
        }
    }

    playLevel(level) {
        this.levelStart = Date.now()
    }

    levelTimer() {
         const levelTime =  (Date.now() - this.startTime) / 1000;
        return levelTime
    }

    allCircles() {
        return [].concat(this.enemyCircles, this.friendlyCircles);
    }

    draw(ctx) {
       ctx.clearRect(0, 0, 1200, 800);
        this.allCircles().forEach(circle => (circle.draw(ctx)));
        this.allCircles().forEach(circle => (circle.grow()))
        this.checkCollisions();
        // console.log(this.overallScore())
    }

    checkCollisions() {
        const allCircles = this.allCircles();
        for (let i = 0; i < allCircles.length; i++) {
            for (let j = 0; j < allCircles.length; j++){
                const circ1 =  allCircles[i];
                const circ2 = allCircles[j];

                if (circ1.hasCollided(circ2)) {
                    circ1.collideWith(circ2);
                }
            }
        }
    }

    enemyCircleScore() {
        const rads = this.enemyCircles.map(circle => circle.rad);
        return rads.reduce((a, b) => (a + b));
    }

    friendlyCircleScore() {
        const rads = this.friendlyCircles.map(circle => circle.rad);
        return rads.reduce((a, b) => (a + b));
    }
 
    overallScore() {
        return (this.friendlyCircleScore() / (this.enemyCircleScore() + this.friendlyCircleScore())) * 100;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./public/javascripts/components/game_view.js":
/*!****************************************************!*\
  !*** ./public/javascripts/components/game_view.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class GameView {
    constructor(ctx, game) {
        this.ctx = ctx;
        this.game = game;

    }

    start() {
        requestAnimationFrame(this.animate.bind(this))
    }
    
    animate () {
        this.game.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this))
    }
  
    // bindKeyHandlers() {
    // }
}


module.exports = GameView;

/***/ }),

/***/ "./public/javascripts/components/util.js":
/*!***********************************************!*\
  !*** ./public/javascripts/components/util.js ***!
  \***********************************************/
/*! exports provided: dist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });

    
    // util func
    const dist = (x1, y1, x2, y2) => {
      let xDistance = x2 - x1;
      let yDistance = y2 - y1;
    
      return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }



/***/ }),

/***/ "./public/javascripts/index.js":
/*!*************************************!*\
  !*** ./public/javascripts/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_circle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/circle */ "./public/javascripts/components/circle.js");
/* harmony import */ var _components_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/game */ "./public/javascripts/components/game.js");
/* harmony import */ var _components_elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/elements */ "./public/javascripts/components/elements.js");
/* harmony import */ var _components_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/util */ "./public/javascripts/components/util.js");
/* harmony import */ var _components_enemy_circle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/enemy_circle */ "./public/javascripts/components/enemy_circle.js");
/* harmony import */ var _components_friendly_circle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/friendly_circle */ "./public/javascripts/components/friendly_circle.js");
// const axios = require('axios');


const GameView = __webpack_require__(/*! ./components/game_view */ "./public/javascripts/components/game_view.js");






// handleMusic(e) {
//   e.preventDefault();
//   if (this.musicBtn.classList.contains('music-on')) {
//     this.music.play();
//     this.musicBtn.classList.remove('music-on');
//     this.musicBtn.classList.add('music-off');
//     this.musicBtn.innerHtml = "Music: Off";
//     } else if (this.musicBtn.classList.contains('music-off')) {
//       this.music.pause();
//       this.musicBtn.classList.remove('music-off');
//       this.musicBtn.classList.add('music-on');
//       this.musicBtn.innerHtml = "Music: On";
//     }
// }

document.addEventListener("DOMContentLoaded", () => {
  
  // document.body.addEventListener("keydown", (e) => {
  //   keys[e.keyCode] = true;
  // });
  // document.body.addEventListener("keyup", (e) => {
  //   keys[e.keyCode] = false;
  // });

    // document.getElementById("mute-audio").addEventListener("click", (e) => {
    //   const music = document.getElementById("music");
    //   if (music.muted === false) {
    //     music.muted = true;
    //     document.getElementById("mute-audio-img").src =
    //       "./assets/img/icons/music-off.png";
    //   } else {
    //     music.muted = false;
    //     document.getElementById("mute-audio-img").src =
    //       "./assets/img/icons/music-on.png";
    //   }
    // });


    // document.getElementById("game-over-yes").addEventListener("click", (e) => {
    //   const modal = document.getElementById("game-over-modal");
    //   modal.style.display = "none";
    //   restartLevel();
    //   requestAnimationFrame(update);
    // });

    // document.getElementById("game-over-no").addEventListener("click", (e) => {
    //   const modal = document.getElementById("game-over-modal");
    //   modal.style.display = "none";
    // });

  const canvas = document.getElementById("game-canvas");
  canvas.width = "1100";
  canvas.height = "715";
  canvas.style =  _components_elements__WEBPACK_IMPORTED_MODULE_2__["Gradients"][Math.floor(Math.random() * 12)];  

  const ctx = canvas.getContext("2d");
  const levels = _components_elements__WEBPACK_IMPORTED_MODULE_2__["Levels"];
  const game = new _components_game__WEBPACK_IMPORTED_MODULE_1__["default"]();
  let currentLevel = 1;
  let startText = `Phase ${currentLevel} commence.`;
  let startTime = Date.now();
  let playerScore = 0;
  let finalScore = 0
  let currentLevelScore = 0;
  const levelTimer = 20000 - (Date.now() - startTime) / 1000
  
  //  window.ctx = ctx;
  //  window.Circle = Circle;
  //  window.Game = Game;
  new GameView(ctx, game).start(); //put in loop?
  // game.buildLevel(levels[currentLevel]); // put in game loop
  // 
  
  let clearWelcome = window.setInterval( ()  => {
    startText = '';
  }, 2000);

  const restartGame = () => {
  game.gameOver = false;
    currentLevel = 1;
    playerScore = 0;
    finalScore = 0;
    currentLevelScore = 0;
    game.startTime = Date.now();
  }

   
  

  function isIntersect(point, circle) {
    return Object(_components_util__WEBPACK_IMPORTED_MODULE_3__["dist"])(point[0],point[1], circle.pos[0],circle.pos[1]) < circle.rad;
  }

  canvas.addEventListener('click', (e)=> {
    const pos = [
      e.layerX,
      e.layerY,
    ];
    
    game.allCircles().forEach(circle => {
      if (isIntersect(pos, circle) && (circle instanceof _components_enemy_circle__WEBPACK_IMPORTED_MODULE_4__["default"])) {
        circle.pauseGrowth(3000);
      } else if (isIntersect(pos, circle) && (circle instanceof _components_friendly_circle__WEBPACK_IMPORTED_MODULE_5__["default"])) {
        circle.speedGrowth(1000);
      }
    })
  })
  
  // ctx.font = '40px serif';
  // ctx.fillStyle = '#FFFFFF';
  // ctx.fillText(`poop`, 100  ,100)
 
  // ctx.fillText(`${game.overallScore()}`, 60, 90);
  
  const gameLoop = () => {
    
    // ctx.font = '38px 48px serif';
    // ctx.fillStyle = 'black';
    // ctx.fillText(`${game.levelTimer()}`, 20, 30);
    // console.log(game.overallScore())
    
    // playLevel(level) {
    //     this.levelStart = Date.now
    // }
    game.buildLevel(levels[currentLevel]);
    

      if(game.gameOver) {
        finalScore = playerScore;
        //logic for firebase
        // const gameOverModal = document.getElementById('gameover_modal');
      }

      if (currentLevel > Object.keys(levels).length - 1 ) {
        finalScore += game.overallScore;
        game.gameOver = true;
        // const winnerWinnerModal = document.getElementById('winner_winner')
      }
        
      if ((game.levelTimer() >= 15) && (game.overallScore() < 50)) {
        game.gameOver = true;
        game.startTime = Date.now()
      } else if ((game.levelTimer <= 0) && (game.overallScore() > 50)) {
        finalScore += game.overallScore;
        currentLevel ++;
        startTime = Date.now();
        game.buildLevel(levels[currentLevel]);we
      }
    
        
    }


    
  

  gameLoop();


});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map