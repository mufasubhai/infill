// const axios = require('axios');
const Circle = require('./components/circle')
const Game = require("./components/game");
const GameView = require("./components/game_view");
import {Levels} from "./components/levels";


document.addEventListener('DOMContentLoaded', () => {   
// function for random gradients
    
    const canvas = document.getElementById('game-canvas')
    canvas.width = "1200";
    canvas.height = "800"
    canvas.style =
      "background:linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)";
    
    const ctx = canvas.getContext("2d");
    const levels = Levels
    const game = new Game();  
    let currentLevel = 1;
    
    window.game = game
    let mouse = {
      x: innerWidth,
      y: innerHeight,
    };

    addEventListener("mousemove", function (event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    //   console.log(mouse.y);
    //   console.log(mouse.x);
    });


    game.buildLevel(levels[currentLevel])
    
    window.ctx = ctx
    // for testing!
    window.Circle = Circle;
    window.Game = Game;
    // window.Game = Game;
    // window.GameView = GameView;
    
    new GameView(ctx, game).start();
    
})
