import friendlyCircle from './friendly_circle'
import enemyCircle from './enemy_circle'


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
                    let growSpeed = .1 +(Math.floor(Math.random() * 5) *.03);
                    let maxRad = Math.floor(Math.random() * 5) * 100 + 100;
                    let rad = Math.floor(Math.random() * 5) + 10;
                    let colors = [ '#c43e37', '#c45637', '#b37120', '#b32036', '#a68428']
                    let randomColor = colors[Math.floor(Math.random() * 4)]
                    const circle = new enemyCircle({
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
                    
                     const circle = new friendlyCircle({
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

    allCircles() {
        return [].concat(this.enemyCircles, this.friendlyCircles);
    }

    draw(ctx) {
       ctx.clearRect(0, 0, 1200, 800);
        this.allCircles().forEach(circle => (circle.draw(ctx)));
        this.allCircles().forEach(circle => (circle.grow()))
        this.checkCollisions();
        // console.log(this.enemyCircleScore());
        console.log(this.friendlyCircleScore())
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
    // inBounds(pos) {
    //     return (pos[0] < 0) || (pos[1] < 0) || (pos[0] > 1100) || (pos[1] > 715)
    // }

}

export default Game;