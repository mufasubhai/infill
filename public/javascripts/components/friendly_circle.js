import Circle from './circle'
import enemyCircle from './enemy_circle'

class friendlyCircle extends Circle {
    constructor(options) {
        super(options) 
    }

    collideWith(object) {
        if (object instanceof enemyCircle) {
            this.isGrowing = 1;
        } 
    }
    speedGrowth(time) {
        const oldSpeed = this.growSpeed;
      this.growSpeed *= 3;
      setInterval(() => (this.growSpeed = oldSpeed), time)

    }
}

export default friendlyCircle;