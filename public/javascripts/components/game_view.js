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
            this.ctx.font = "20px Monaco";
            this.ctx.fillStyle = "white";
               this.ctx.shadowColor = '#ac13d6';
            this.ctx.shadowOffsetX = 2;
            this.ctx.shadowOffsetY = 2;
            this.ctx.shadowBlur = 1;
            this.ctx.fillText(`Time: ${this.game.levelTimer().toFixed(1)}`, 40  ,40)

            this.ctx.font = "20px Monaco";
            this.ctx.fillStyle = "white";
            this.ctx.shadowColor = '#ac13d6';
            this.ctx.shadowOffsetX = 2;
            this.ctx.shadowOffsetY = 2;
            this.ctx.shadowBlur = 1;
            this.ctx.fillText(`${this.game.overallScore().toFixed()}% Full`, 235, 40);


            this.ctx.font = "20px Monaco";
            this.ctx.fillStyle = "white";
            this.ctx.shadowColor = '#ac13d6';
            this.ctx.shadowOffsetX = 2;
            this.ctx.shadowOffsetY = 2;
            this.ctx.shadowBlur = 1;
            this.ctx.fillText(`Current Phase: ${this.game.currentLevel}/9 `, 400, 40);
      
      
            this.ctx.font = "20px Monaco";
            this.ctx.fillStyle = "white";
            this.ctx.shadowColor = '#ac13d6';
            this.ctx.shadowOffsetX = 2;
            this.ctx.shadowOffsetY = 2;
            this.ctx.shadowBlur = 1;
            this.ctx.fillText(`Total Score: ${this.game.finalScore.toFixed(1)}`, 700, 40);


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