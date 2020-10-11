class GameView {
    constructor(ctx, game) {
        this.ctx = ctx;
        this.game = game;
        this.pause = false;
    }

    start() {
        
            requestAnimationFrame(this.animate.bind(this))
        
       
    }
    
    animate () {
        if (!this.pause) {

            this.game.draw(this.ctx);
           requestAnimationFrame(this.animate.bind(this))
        }
    }
  
   
    // stop() {
    //     if (this.animationFrame) {
    //         cancelAnimationFrame(this.animationFrame)
    //         this.animationFrame = undefined;

    //     }
    // }
}


module.exports = GameView;