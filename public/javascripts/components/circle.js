
import {dist} from './util'

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
        const centerDist = dist(
            this.pos[0], 
            this.pos[1], 
            oCirc.pos[0], 
            oCirc.pos[1]
            );
        
        return centerDist  < this.rad + oCirc.rad;
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

export default Circle;