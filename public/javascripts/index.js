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
  
  // document.body.addEventListener("keydown", (e) => {
  //   keys[e.keyCode] = true;
  // });
  // document.body.addEventListener("keyup", (e) => {
  //   keys[e.keyCode] = false;
  // });

    // document.getElementById("mute-audio").addEventListener("click", (e) => {
    //   const music = document.getElementById("music");
    //   if (music.muted === false) {
    //     music.muted = true;
    //     document.getElementById("mute-audio-img").src =
    //       "./assets/img/icons/music-off.png";
    //   } else {
    //     music.muted = false;
    //     document.getElementById("mute-audio-img").src =
    //       "./assets/img/icons/music-on.png";
    //   }
    // });


    // document.getElementById("game-over-yes").addEventListener("click", (e) => {
    //   const modal = document.getElementById("game-over-modal");
    //   modal.style.display = "none";
    //   restartLevel();
    //   requestAnimationFrame(update);
    // });

    // document.getElementById("game-over-no").addEventListener("click", (e) => {
    //   const modal = document.getElementById("game-over-modal");
    //   modal.style.display = "none";
    // });

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
  let finalScore = 0
  let currentLevelScore = 0;
  const levelTimer = 20000 - (Date.now() - startTime) / 1000
  
  //  window.ctx = ctx;
  //  window.Circle = Circle;
  //  window.Game = Game;
  new GameView(ctx, game).start(); //put in loop?
  // game.buildLevel(levels[currentLevel]); // put in game loop
  // 
  
  let clearWelcome = window.setInterval( ()  => {
    startText = '';
  }, 2000);

  const restartGame = () => {
  game.gameOver = false;
    currentLevel = 1;
    playerScore = 0;
    finalScore = 0;
    currentLevelScore = 0;
    game.startTime = Date.now();
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
  
  // ctx.font = '40px serif';
  // ctx.fillStyle = '#FFFFFF';
  // ctx.fillText(`poop`, 100  ,100)
 
  // ctx.fillText(`${game.overallScore()}`, 60, 90);
  
  const gameLoop = () => {
    
    // ctx.font = '38px 48px serif';
    // ctx.fillStyle = 'black';
    // ctx.fillText(`${game.levelTimer()}`, 20, 30);
    // console.log(game.overallScore())
    
    // playLevel(level) {
    //     this.levelStart = Date.now
    // }
    game.buildLevel(levels[currentLevel]);
    
    window.setInterval(function() {
       console.log(game.overallScore())
        console.log(game.levelTimer())
      if(game.gameOver) {
        finalScore = playerScore;
        //logic for firebase
        // const gameOverModal = document.getElementById('gameover_modal');
      }

      if (currentLevel > Object.keys(levels).length - 1 ) {
        finalScore += game.overallScore;
        game.gameOver = true;
        // const winnerWinnerModal = document.getElementById('winner_winner')
      }
        console.log(game.friendlyCircles)
      if ((game.levelTimer() >= 15) && (game.overallScore() < 50)) {
        game.gameOver = true;
        game.startTime = Date.now()
        ctx.clearRect(0, 0, 1200, 800);
           game.friendlyCircles = [];
        game.enemyCircles = [];

      } else if ((game.levelTimer() >= 15) && (game.overallScore() > 50)) {
        finalScore += game.overallScore;
        ;
        // console.log(currentLevel)
        // console.log(levels[currentLevel])
        startTime = Date.now();
        game.friendlyCircles = [];
        game.enemyCircles = [];
        ctx.clearRect(0, 0, 1200, 800);
        console.log(currentLevel)
        game.buildLevel(levels[currentLevel + 1]);
        currentLevel += 1;
      }
    
    }, 100)
        
    }


    
  
//     0: friendlyCircle { 
// area: 1934.4424626135142,
// color: "#28a641",
// growSpeed: 0.19,
// isGrowing: 1,
// maxRad: 500,
// pos: [0,2],git

  // }
  gameLoop();

  


});
