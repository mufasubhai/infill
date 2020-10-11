import Circle from './circle'
import friendlyCircle from './friendly_circle'

class enemyCircle extends Circle {
  constructor(options) {
    super(options);
  }

  collideWith(object) {
    if (object instanceof friendlyCircle) {
      this.isGrowing = 1;
    }
  }

  pauseGrowth(time) {
      this.isGrowing = 1;
      setInterval(() => (this.isGrowing = 0), time)
  }

  // playSound() {

  // }
}

export default enemyCircle;

