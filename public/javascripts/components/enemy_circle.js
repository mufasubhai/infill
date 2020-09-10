const Circle = require('./circle');


class enemyCircle extends Circle {
  constructor(options) {
    super(options);
  }

  collideWith(object) {
    if (object instanceof friendlyCircle) {
      this.isGrowing = false;
    }
  }

  pauseGrowth(time) {
      this.isGrowing = false;
      setInterval(() => (this.isGrowing = true), time)
  }
}

module.exports = enemyCircle;

