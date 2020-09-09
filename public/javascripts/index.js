const axios = require('axios');
const Circle = require('./components/circle')
const Game = require("./components/game");
const GameView = require("./components/game_view");
const Levels = require("./levels");


document.addEventListener('DOMContentLoaded', () => {   
// function for random gradients
    
    const canvas = document.getElementById('game-canvas')
    canvas.width = "1200";
    canvas.height = "800"
    canvas.style =
      "background:linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)";
    
    const ctx = canvas.getContext("2d");
    const game = new Game(Levels);  
    

    // for testing!
    window.Circle = Circle;
    window.Game = Game;
    window.GameView = GameView;
    
    new GameView(game, ctx).start();
    
})
