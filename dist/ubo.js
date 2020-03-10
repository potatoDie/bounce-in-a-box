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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/*
 * Drawing an (unidentiefied?) bouncing object in a bounding container
 */





var ctx;

window.onload = function () {

    ctx = Object(_canvas_js__WEBPACK_IMPORTED_MODULE_1__["setupCanvas"])(800, 600);

    // Create the bounding container
    let uboCell = UboCell();
    uboCell.init();
    uboCell.draw(ctx);

    // Create an object inside the container at a given position, with a given speed
    var ubo = Ubo(uboCell, new _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"](0, 2), new _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"](1, -1), 
        {
            lineWidth: .1, 
            strokeStyle: "rgba(255,255,255, .4)"
        },
        10 
    );

    ubo.update();
}



/*
* The uboCell
* is a polygon consisting of a collection of vertices, connected by edges
* with a gravititional force defined
*/
var UboCell = function() {

    let v = [
        [-3, -3], 
        [0,-5], 
        [0,-1.5], 
        [2,-1.8], 
        [2.3,-2.7], 
        [3.7,-2.6], 
        [4,0], 
        [4.6,3.5], 
        [-4,1], 
    ];

    var edges = [];

    return {
        gForce: new _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"](-.1, -9.8), // Gravitation force inside the uboCell
        edges: edges,
        draw: function(ctx) { 
            
            ctx.beginPath();
            ctx.moveTo(edges[0].a.x, edges[0].a.y);
            for (let i = 0; i < edges.length - 1; i++ ) {
                ctx.lineTo(edges[i].b.x, edges[i].b.y);
            }
            ctx.closePath();
            ctx.fill();
        },
        init: function () {
            let vertices =[];

            // Upgrade vertice array to vectors
            for (let i = 0; i < v.length; i++) {
                let p = new _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"](v[i]);
                vertices.push(p);
            };
            
            // Close the loop
            vertices.push(new _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"](v[0]));

            for (let i = 0; i < vertices.length - 1; i++) {
                edges.push({a: vertices[i], b: vertices[i+1]});
            };
        },
    }
}


/*
* Unidentified bouncing object
* point p and velocity v are recalculated each update
*/
var Ubo = function (uboCell, p, v, style, delay) {
    
    var count = 0;

    // Copy  ubo style to canvas
    for (var x in style) {
        ctx[x] = style[x];
    }
    
    var update = function() {
        
        var intersection;

        if (++count < 20) {
            window.setTimeout (update, delay );
        }

        // Calculate intersection with an edge
        intersection = findFirstIntersection();
        
        if (!intersection) {
            console.log("No intersection.");
            return;
        }

        // Leave a mark where the ubo hits an edge
        _canvas_js__WEBPACK_IMPORTED_MODULE_1__["Gfx"].dot(ctx, intersection.point, "#f00");
        
        /**
         * Calculate bezier curve and draw it
         */
        let q = intersection.point;
        let t = intersection.t;
        
        let controlPoint = new _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"](p.x + v.x * t / 2, p.y + v.y * t / 2);
              
        ctx.beginPath();
        ctx.moveTo(p.x,p.y);
        ctx.quadraticCurveTo(
            controlPoint.x, 
            controlPoint.y,
            q.x, 
            q.y
        );
        ctx.stroke();
        
        
        // Calculate new speed vector
        // The speed vector of the ubo when it hits the edge
        var v1 = new _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"](
            v.x + uboCell.gForce.x * intersection.t, 
            v.y + uboCell.gForce.y * intersection.t
        );

        let intersectedLine = uboCell.edges[intersection.line_no];
        var r = _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"].subtract(intersectedLine.b, intersectedLine.a);
                
        // Angle between edge and speed vector (going from the latter to the former 
        // in counterclockwise direction)
        var φ = Math.atan2(r.y, r.x) - Math.atan2(v1.y, v1.x);
                
        v = new _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"](
            v1.x * Math.cos(2 * φ) - v1.y * Math.sin(2 * φ), 
            v1.x * Math.sin(2 * φ) + v1.y * Math.cos(2 * φ)
        );
        
        
        // Gfx.line(ctx, p, controlPoint, "rgba(0, 0, 0, .5)")
        // Gfx.line(ctx, q, controlPoint, "rgba(0, 0, 0, .5)")
        // Gfx.dot(ctx, controlPoint, "#f0f");
        // Gfx.dot(ctx, p, "#00f");
        
        p = q;
    }	
    
    // crossEdge
    // 
    // Calculate when and where the ubo-parabola crosses a given edge
    // 
    // Return array of intersection points, with the parameters t and s added
    // 
    // For points on the edge, s lies between 0 and 1
    // Make sure you don't disturb the edge (with Vector operations add or subtract and so on)

    var crossEdge = function (edge) {
        var point,
            intersections = [];

        let r = _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"].subtract(edge.b, edge.a),
            q = edge.a,
            g = uboCell.gForce;

        if (r.x == 0) {
            // Special case: Vertical line
            let t_array = _math_js__WEBPACK_IMPORTED_MODULE_2__["Algebra"].solveQuadraticEquation(0.5 * g.x, v.x, p.x - q.x);

            for (var i = 0; i < t_array.length; i++) {
                let t = t_array[i];
                let s = (p.y - q.y + v.y * t + 0.5 * g.y * t * t) / r.y;
                if (s >= 0 && s <= 1){
                    point = _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(q, _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"].multiply(r, s));
                    intersections.push( {point: point, t: t, s: s} );
                }
            };
        } else {
            var a = 0.5 * g.y - 0.5 * g.x * r.y / r.x;
            var b = v.y - v.x * r.y / r.x;
            var c = p.y - q.y + (q.x - p.x) * r.y / r.x;

            var t_array = _math_js__WEBPACK_IMPORTED_MODULE_2__["Algebra"].solveQuadraticEquation(a, b, c);

            for (var i = 0; i < t_array.length; i++) {
                let t = t_array[i];
                let s = (p.x - q.x + v.x * t + 0.5 * g.x * t * t) / r.x;
                
                if (s >= 0 && s <= 1){
                    point = _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(q, _vec2_js__WEBPACK_IMPORTED_MODULE_0__["default"].multiply(r, s));
                    intersections.push({point: point, t: t, s: s});
                }
            };
        }

        return intersections;
    }


    // findFirstIntersection
    // Loop through all the edges of the uboCell
    // You want the point with minimal t > 0
    
    var findFirstIntersection = function() {
        var intersection, intersections;
        var min = Number.MAX_VALUE, line_no;
        
        for (var i = 0; i < uboCell.edges.length; i++) {
            intersections = crossEdge(uboCell.edges[i]);
            
            for (var j = 0; j < intersections.length; j++) {
                /* Allow some error in computer calculation: set a treshold for the minimum time to the next intersection*/
                if (intersections[j].t > 1e-10 && intersections[j].t < min ) {
                    min = intersections[j].t;
                    intersections[j].line_no = i; // Include a reference to the crossed edge
                    intersection = intersections[j];
                }
            };
        };

        return intersection;
    };

    return {
        update: update
    }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Module Vec2
 * 2D vector class, based on https://evanw.github.io/lightgl.js/docs/vector.html
 * Both member and static function are implemented
 *
 * NOTE: This module is in development, only the methods I needed are included
 */

/**
 * 
 */
class Vec2 {
    /**
     * Class constructor. Takes two numeric arguments.
     * or a single array or (TODO) object with values for both axes.
     *
     * @param {Number} x 
     * @param {Number} y
     * @return {Vec2} A new instance of Vec2 
     */
    constructor(x, y) {
        if (typeof x === 'number' && typeof y === 'number') {
            this.x = x;
            this.y = y;
        } else if (Array.isArray(x) && x.length === 2 && y === undefined) {
            this.x = x[0];
            this.y = x[1];
        } else {
            throw Error('Invalid instantiation');
        }
    }
    
    add(v) {
        this.x += v.x;
        this.y += v.y;

        return this;
    }
    
    equalTo(v) {
        return this.x == v.x && this.y == v.y;
    }

    cross(w) {
        return this.x * w.y - this.y * w.x;
    }

    static add(v, w) {
        // Leaves existing vectors alone
        return new Vec2(v.x + w.x, v.y + w.y);
    }

    static subtract(v, w) {
        // Leaves existing vectors alone
        return new Vec2(v.x - w.x, v.y - w.y);
    }

    /**
     * You could also multiply with another vector, but do you ever use that?
     * @param {Vec2} v 
     * @param {Number} s 
     */
    static multiply(v, s) {
        return new Vec2(v.x * s, v.y * s);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Vec2);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupCanvas", function() { return setupCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gfx", function() { return Gfx; });
function setupCanvas(w, h)	{
    
    var canvas = document.getElementById('canvas')
    canvas.width = w;
    canvas.height = h;
    
    let ctx = canvas.getContext('2d');
    
    ctx.translate(w/2, h/2);
    ctx.scale(60,-60); // Note minus sign for y-value, to mirror graphic. (Using math coords)
    
    ctx.lineWidth = .4;
    ctx.fillStyle = "#2A2E3F";
    ctx.strokeStyle = "rgba(255,255,255, .1)";

    return ctx;
}


// Collection of a few graphic functions
// Assume a canvas context ctx is available
var Gfx = {
    dot: function(ctx, p, fs) {
        ctx.fillStyle = fs;
        ctx.beginPath();
        ctx.arc( p.x, p.y, .06, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();							
    },
    line: function(ctx, p, q, fs) {
        ctx.strokeStyle = fs;
        ctx.beginPath();
        ctx.moveTo( p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.closePath();
        ctx.stroke();							
    }
}

 

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Algebra", function() { return Algebra; });

var Algebra = {
    // Solve a quadratic equation, given a, b, c
    // Returns an array with 0, 1, or 2 real solutions
    solveQuadraticEquation: function (a, b, c) {
        if (a == 0) {
            // If a equals zero, it's not a quadratic equation. You may solve it
            // anyway, if b is not also zero.
            return b != 0 ? [-c/b] : [];
        }

        var D = b * b - 4 * a * c; // The discriminant
        if (D < 0) {
            return [];
        } else if (D == 0) {
            return [ -b / (2 * a)];
        } else {
            return [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)];
        }
    }
}



/***/ })
/******/ ]);