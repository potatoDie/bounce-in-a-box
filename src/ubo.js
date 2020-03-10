/*
 * Drawing an (unidentiefied?) bouncing object in a bounding container
 */

import Vec2 from './vec2.js';
import { setupCanvas, Gfx } from './canvas.js';
import { Algebra } from './math.js';

var ctx;

window.onload = function () {

    ctx = setupCanvas(800, 600);

    // Create the bounding container
    let uboCell = UboCell();
    uboCell.init();
    uboCell.draw(ctx);

    // Create an object inside the container at a given position, with a given speed
    var ubo = Ubo(uboCell, new Vec2(0, 2), new Vec2(1, -1), 
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
        gForce: new Vec2(-.1, -9.8), // Gravitation force inside the uboCell
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
                let p = new Vec2(v[i]);
                vertices.push(p);
            };
            
            // Close the loop
            vertices.push(new Vec2(v[0]));

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
        Gfx.dot(ctx, intersection.point, "#f00");
        
        /**
         * Calculate bezier curve and draw it
         */
        let q = intersection.point;
        let t = intersection.t;
        
        let controlPoint = new Vec2(p.x + v.x * t / 2, p.y + v.y * t / 2);
              
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
        var v1 = new Vec2(
            v.x + uboCell.gForce.x * intersection.t, 
            v.y + uboCell.gForce.y * intersection.t
        );

        let intersectedLine = uboCell.edges[intersection.line_no];
        var r = Vec2.subtract(intersectedLine.b, intersectedLine.a);
                
        // Angle between edge and speed vector (going from the latter to the former 
        // in counterclockwise direction)
        var φ = Math.atan2(r.y, r.x) - Math.atan2(v1.y, v1.x);
                
        v = new Vec2(
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

        let r = Vec2.subtract(edge.b, edge.a),
            q = edge.a,
            g = uboCell.gForce;

        if (r.x == 0) {
            // Special case: Vertical line
            let t_array = Algebra.solveQuadraticEquation(0.5 * g.x, v.x, p.x - q.x);

            for (var i = 0; i < t_array.length; i++) {
                let t = t_array[i];
                let s = (p.y - q.y + v.y * t + 0.5 * g.y * t * t) / r.y;
                if (s >= 0 && s <= 1){
                    point = Vec2.add(q, Vec2.multiply(r, s));
                    intersections.push( {point: point, t: t, s: s} );
                }
            };
        } else {
            var a = 0.5 * g.y - 0.5 * g.x * r.y / r.x;
            var b = v.y - v.x * r.y / r.x;
            var c = p.y - q.y + (q.x - p.x) * r.y / r.x;

            var t_array = Algebra.solveQuadraticEquation(a, b, c);

            for (var i = 0; i < t_array.length; i++) {
                let t = t_array[i];
                let s = (p.x - q.x + v.x * t + 0.5 * g.x * t * t) / r.x;
                
                if (s >= 0 && s <= 1){
                    point = Vec2.add(q, Vec2.multiply(r, s));
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