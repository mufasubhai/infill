const friendlyCircle = require('./friendly_circle');
const enemyCircle = require('./enemy_circle');



class Game {
    constructor() {
        this.enemyCircles = [];
        this.friendlyCircles = [];
    }

    buildLevel(level) {
        for (let i = 0; i < level.length; i++) {
            for (let j = 0; j< level[0].length; j++) {
                if (level[i][j] === 1) {
                    let circleX = 65 * i;
                    let circleY = 65 * j;
                    let growSpeed = Math.floor(Math.random() * 5) * .01 ;
                    let maxRad = Math.floor(Math.random() * 5) * 100 + 100;
                    let rad = Math.floor(Math.random() * 5) + 10;
                    const circle = new enemyCircle({
                        pos: [circleX, circleY],
                        color: 'blue',
                        rad: rad,
                        growSpeed: growSpeed,
                        maxRad: maxRad,
                        isGrowing: 0,
                    })

                    this.enemyCircles.push(circle)

                } else if (level[i][j] === 2) {
                    let circleX = 65 * i;
                    let circleY = 65 * j;   
                    let growSpeed = Math.floor(Math.random() * 5) * .01;
                    let maxRad = Math.floor(Math.random() * 5) * 100 + 100;
                    let rad = Math.floor(Math.random() * 5) + 10;

                     const circle = new friendlyCircle({
                       pos: [circleX, circleY],
                       color:"red",
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

    allCircles() {
        return [].concat(this.enemyCircles, this.friendlyCircles);
    }

    draw(ctx) {
       ctx.clearRect(0, 0, 1200, 800);
        this.allCircles().forEach(circle => (circle.draw(ctx)));
        this.allCircles().forEach(circle => (circle.grow()))
    }
}

module.exports = Game;