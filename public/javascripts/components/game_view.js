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
            this.ctx.font = "20px Arial";
            this.ctx.fillStyle = 'Black';
               this.ctx.shadowColor = 'white';
            this.ctx.shadowOffsetX = 2;
            this.ctx.shadowOffsetY = 2;
            this.ctx.shadowBlur = 1;
            this.ctx.fillText(this.game.levelTimer().toFixed(1), 20  ,40)

            this.ctx.font = "20px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.shadowColor = 'white';
            this.ctx.shadowOffsetX = 2;
            this.ctx.shadowOffsetY = 2;
            this.ctx.shadowBlur = 1;
            this.ctx.fillText(`Current Level: ${this.game.overallScore().toFixed()}% Full`, 200, 40);


            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(this.game.levelTime, 600, 400)
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