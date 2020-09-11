import Circle from './circle'
import enemyCircle from './enemy_circle'

class friendlyCircle extends Circle {
    constructor(options) {
        super(options) 
    }

    collideWith(object) {
        if (object instanceof enemyCircle) {
            this.isGrowing = false;
        } 
    }
}

export default friendlyCircle;