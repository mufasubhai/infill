
class Circle {
    constructor(position, color, startRad, growSpeed, maxRad) {
        this.position = position;
        this.color = color;
        this.startRad = startRad;
        this.growSpeed = growSpeed;
        this.maxRad = maxRad
    }

    draw (ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.position[0], 
            this.position[1], 
            this.startRad, 0, 2 * Math.PI, true
        );
        ctx.fill();
    }

    
}

module.exports = Circle;