// const axios = require('axios');
import Circle from './components/circle'
import Game from './components/game'
const GameView = require("./components/game_view");
import { Levels, Gradients } from "./components/elements";
import { dist } from './components/util'
import enemyCircle from './components/enemy_circle'
import friendlyCircle from './components/friendly_circle'


// handleMusic(e) {
//   e.preventDefault();
//   if (this.musicBtn.classList.contains('music-on')) {
//     this.music.play();
//     this.musicBtn.classList.remove('music-on');
//     this.musicBtn.classList.add('music-off');
//     this.musicBtn.innerHtml = "Music: Off";
//     } else if (this.musicBtn.classList.contains('music-off')) {
//       this.music.pause();
//       this.musicBtn.classList.remove('music-off');
//       this.musicBtn.classList.add('music-on');
//       this.musicBtn.innerHtml = "Music: On";
//     }
// }

document.addEventListener("DOMContentLoaded", () => {
  
  const canvas = document.getElementById("game-canvas");
  canvas.width = "1100";
  canvas.height = "715";
  canvas.style =  Gradients[Math.floor(Math.random() * 12)];  

  const ctx = canvas.getContext("2d");
  const levels = Levels;
  const game = new Game();
  let currentLevel = 1;
  let startText = `Phase ${currentLevel} commence.`;
  let startTime = Date.now();
  let playerScore = 0;
  //game.overallScore()
  let currentLevelScore = 0;

  let clearWelcome = window.setInterval( ()  => {
    startText = '';
  }, 2000);

  const restartGame = () => {
    game.gameOver = false;
    currentLevel = 1;
    startTime = Date.now();
  }

  const levelTimer = () => {
   20000 - (Date.now() - startTime) / 1000
  }

  function isIntersect(point, circle) {
    return dist(point[0],point[1], circle.pos[0],circle.pos[1]) < circle.rad;
  }

  canvas.addEventListener('click', (e)=> {
    const pos = [
      e.layerX,
      e.layerY,
    ];
    
    game.allCircles().forEach(circle => {
      if (isIntersect(pos, circle) && (circle instanceof enemyCircle)) {
        circle.pauseGrowth(3000);
      } else if (isIntersect(pos, circle) && (circle instanceof friendlyCircle)) {
        circle.speedGrowth(1000);
      }
    })
  })

  game.buildLevel(levels[currentLevel]);

  window.ctx = ctx;

  window.Circle = Circle;
  window.Game = Game;
  
  new GameView(ctx, game).start();
});
