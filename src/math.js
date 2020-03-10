
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

export { Algebra }