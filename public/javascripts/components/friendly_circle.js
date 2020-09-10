const Circle = require('./circle')

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

module.exports = friendlyCircle;