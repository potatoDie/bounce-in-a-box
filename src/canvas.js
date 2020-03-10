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

export { setupCanvas, Gfx } 