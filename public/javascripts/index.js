// const axios = require('axios');
import Circle from './components/circle'
import Game from './components/game'
const GameView = require("./components/game_view");
import { Levels, Gradients } from "./components/elements";
import {dist} from './components/util'

document.addEventListener("DOMContentLoaded", () => {
  // function for random gradients

  const canvas = document.getElementById("game-canvas");
  canvas.width = "1100";
  canvas.height = "715";
  canvas.style = Gradients[Math.floor(Math.random() * 12)];
    

  const ctx = canvas.getContext("2d");
  const levels = Levels;
  const game = new Game();
  let currentLevel = 1;

  function isIntersect(point, circle) {
    return dist(point[0],point[1], circle.pos[0],circle.pos[1])< circle.rad;
  }
  canvas.addEventListener('click', (e)=> {
    console.log(e)
    const pos = [
      e.layerX,
      e.layerY,
    ];
    
    game.allCircles().forEach(circle => {
      if (isIntersect(pos, circle)) {
        console.log('click on circle:' + circle.color)
      }
    })

  })
  window.game = game;
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

  game.buildLevel(levels[currentLevel]);

  window.ctx = ctx;
  // for testing!
  window.Circle = Circle;
  window.Game = Game;
  

  new GameView(ctx, game).start();
});
