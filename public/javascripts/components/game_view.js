
class GameView {
    constructor(ctx, game) {
        this.ctx = ctx;
        this.game = game;

    }

    bindKeyHandlers() {

    }

    start() {
        // this.bindKeyHandlers();
        
        requestAnimationFrame(this.animate.bind(this))
    }

    animate () {
        this.game.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this))
    }
    
}


module.exports = GameView;