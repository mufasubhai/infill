class GameView {
    constructor(ctx, game) {
        this.ctx = ctx;
        this.game = game;

    }

    start() {
        requestAnimationFrame(this.animate.bind(this))
    }
    
    animate () {
        this.game.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this))
    }
  git 
    // bindKeyHandlers() {
    // }
}


module.exports = GameView;