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

export default Vec2;