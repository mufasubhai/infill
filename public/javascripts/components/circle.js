
const Util = require('./util')


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
        ctx.fillStyle = this.color;
        // ctx.fillStyle = grid;
        ctx.beginPath();
        ctx.arc(
            this.pos[0], 
            this.pos[1], 
            this.rad, 0, 2 * Math.PI, true
        );
        ctx.fill();
        if (this.rad < this.maxRad) {
            this.rad += this.growSpeed;
        }
    }

    hasCollided(oCirc) {  
        const centerDist = Util.dist(
            this.pos[0], 
            this.pos[1], 
            oCirc.pos[0], 
            oCirc.pos[1]
            );
        
        return centerDist  < this.rad - oCirc.rad;
    } 

    collideWith(object) {
   
    }

    grow() {
        if ((this.rad < this.maxRad) && this.isGrowing) {
            this.rad += this.growSpeed;
        } 
    }
    render (ctx) {

    }

}

module.exports = Circle;