import friendlyCircle from './friendly_circle'
import enemyCircle from './enemy_circle'
import * as Tone from 'tone'



class Game {
    constructor() {
        this.enemyCircles = [];
        this.friendlyCircles = [];
        this.gameOver = false;
        this.levelStart = null;
        this.startTime = Date.now();
        this.levelTime = "";
        this.currentLevel = 1
        this.finalScore = 0;
    }
    
    
    buildLevel(level) {
        let levelEnemyCircles = [];
        let levelFriendlyCircles = [];
        // console.log('build-level-game')
        let speeds = [.06, .07, .08, .09, .1 , .11, .12, .13, .14, .15]
        for (let i = 0; i < level.length; i++) {
            for (let j = 0; j< level[0].length; j++) {
                if (level[i][j] === 1) {
                    let circleX = 55 * i;
                    let circleY = 58 * j;
                    let growSpeed = speeds[Math.floor(Math.random() * 9)]
                    let maxRad = 1000;
                    // let rad = Math.floor(Math.random() * 5) + 10;
                    let rad = 1;
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

                    levelEnemyCircles.push(circle)

                } else if (level[i][j] === 2) {
                    let circleX = 55 * i;
                    let circleY = 56 * j;   
                    let growSpeed = speeds[Math.floor(Math.random() * 9)]
                    // let growSpeed = .1+ (Math.floor(Math.random() * 5) * .03);
                    let maxRad = 1000;
                    // let rad = Math.floor(Math.random() * 5) + 10;
                    let rad = 1;
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

                    levelFriendlyCircles.push(circle);
                } 
            }
        }
        this.enemyCircles = levelEnemyCircles;
        this.friendlyCircles = levelFriendlyCircles;
        console.log(this.friendlyCircles)
    }

    // playLevel(level) {
    //     this.levelStart = Date.now()
    // }

    levelTimer() {
        if (this.startTime === 0) {
            return 0;
        } else {
            const levelTime =  (Date.now() - this.startTime) / 1000;
           return  15 - levelTime

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
        //   ctx.save();
        //   ctx.clearRect(0,0, 1200, 800)
       
    }

    checkCollisions() {
        const allCircles = this.allCircles();
        for (let i = 0; i < allCircles.length; i++) {
            for (let j = 0; j < allCircles.length; j++){
                const circ1 =  allCircles[i];
                const circ2 = allCircles[j];

                if (circ1.hasCollided(circ2)) {
                    circ1.collideWith(circ2);
                    // add sound 
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
 
    overallScore() {

        return (this.friendlyCircleScore() / (this.enemyCircleScore() + this.friendlyCircleScore())) * 100;
    }
}

export default Game;