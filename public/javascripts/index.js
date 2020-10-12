// const axios = require('axios');
import Circle from './components/circle'
import Game from './components/game'
const GameView = require("./components/game_view");
import { Levels, Gradients } from "./components/elements";
import { dist } from './components/util'
import enemyCircle from './components/enemy_circle'
import friendlyCircle from './components/friendly_circle'
import * as Tone from 'tone'


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





// handleMute(e) {
//   e.preventDefault
// }

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.23.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyDBjU8qJqQUF48NESEUI9zwYIAPkLDWKYM",
//     authDomain: "infill-c09a6.firebaseapp.com",
//     databaseURL: "https://infill-c09a6.firebaseio.com",
//     projectId: "infill-c09a6",
//     storageBucket: "infill-c09a6.appspot.com",
//     messagingSenderId: "269686008412",
//     appId: "1:269686008412:web:7f71581e3398798da11499",
//     measurementId: "G-DTBBC0L6Q2"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>

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

  
    // const vol = new Tone.Volume(-12).toDestination();
    // const osc = new Tone.Oscillator().connect(vol).start();
    // vol.mute = true;

  

document.addEventListener("DOMContentLoaded", () => {
  
  const tones = [ "eb4", "eb3", "eb2", "eb5", "f2", "f3", "f4", "f5", "ab2", "ab3", "ab4", "c1", "c2", "c3", "c4", "c5", "db2", "db3", "db4", "db5" ]
  const notes = [ "1n", "2n", "3n", "4n", "8n", "16n" ] 
        
  const pingPong = new Tone.PingPongDelay("2n", .2).toDestination();

  let synth1 = new Tone.FMSynth().toDestination().connect(pingPong);
  let synth2 = new Tone.AMSynth().toDestination().connect(pingPong);
  console.log(synth1)
  
  const canvas = document.getElementById("game-canvas");
  canvas.width = "932";
  canvas.height = "632";
  canvas.style =  Gradients[Math.floor(Math.random() * 12)];  
  
  const ctx = canvas.getContext("2d");

  const levels = Levels;
  const game = new Game();
  let currentLevel = 1;
  let startText = `Phase ${currentLevel} commence.`;
  let finalScore = game.finalScore;
  let gameView = new GameView(ctx, game)
  let timed = game.levelTime
  gameView.start();


  Tone.Master.mute = false;



  document.getElementById('music').addEventListener("click", (e) => {
    let music = document.getElementById('music');
    if (Tone.Master.mute === true) {
      Tone.Master.mute = false;
      music.innerHTML = "Mute Sound"
      console.log(Tone.Master.mute)
    } else {
      Tone.Master.mute = true;
      music.innerHTML = "Unmute Sound"
      console.log(Tone.Master.mute)
    }
  })


  
    // Tone.Master.mute = true; 
// vol.mute = true;


  // const levelTimer = 20000 - (Date.now() - startTime) / 1000
  //  window.ctx = ctx;
  //  window.Circle = Circle;
  //  window.Game = Game;
  // gameView.stop();
  //put in loop?
  // game.buildLevel(levels[currentLevel]); // put in game loop
  // 
  
  let clearWelcome = window.setInterval( ()  => {
    startText = '';
  }, 2000);

  const restartGame = () => {
  game.gameOver = false;
    currentLevel = 1;
    game.finalScore = 0;
    finalScore = 0;
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
        let randomNote = notes[Math.floor(Math.random() * 5)]
        let randomTone = tones[Math.floor(Math.random() * 19)]
        synth1.triggerAttackRelease(randomTone, randomNote);
      } else if (isIntersect(pos, circle) && (circle instanceof friendlyCircle)) {
        circle.speedGrowth(1000);
        let randomNote = notes[Math.floor(Math.random() * 5)]
        let randomTone = tones[Math.floor(Math.random() * 19)]
        synth2.triggerAttackRelease(randomTone, randomNote);

      }
    })
  })
  
  // ctx.font = '40px serif';
  // ctx.fillstyle = '#FFFFFF';
  // ctx.fillText(`poop`, 100  ,100)
  // ctx.fillText(`${game.overallScore()}`, 60, 90);

  const gameLoop = (level) => {
    

    // canvas.style =  Gradients[Math.floor(Math.random() * 12)];  



    ctx.clearRect(0,0,1000,800)
    game.buildLevel(levels[level]);



      let currentLevelLoop = window.setInterval(function() {
        //  console.log(game.overallScore().toFixed(4))
        //   console.log(game.levelTimer().toFixed(2))
          

        console.log(level)
        if(game.gameOver) {
          
          
          // const gameOverModal = document.getElementById('gameover_modal');
        }
  
        if (currentLevel > Object.keys(levels).length - 1 ) {
          game.gameOver = true;
        
          // const winnerWinnerModal = document.getElementById('winner_winner')
        }

        
          // ctx.font = "35px VT323";
          // ctx.fillStyle = 'white';
          // ctx.fillText(game.levelTimer().toFixed(2), 100  ,100)
          // ctx.save();
        
          // console.log(game.friendlyCircles[1])
        if ((game.levelTimer() <= 0) && (game.overallScore() < 50)) {
          game.gameOver = true;
          game.startTime = Date.now()
          gameView.pause = true;

          // ctx.clearRect(0, 0, 1000, 800);
          clearInterval(currentLevelLoop)
          
          
          
        } else if ((game.levelTimer() <= 0) && (game.overallScore() > 50)) {
          game.startTime = 0;
          
          
          game.finalScore += game.overallScore();
          
          
          clearInterval(currentLevelLoop)
          // gameView.pause = true;
          ctx.clearRect(0, 0, 1000, 800);
          
          timed = 5;
          
          let restartTimer = setInterval(function(){
            if (timed >= 0) {
              console.log(timed)
              timed -= 1
            } else {
              clearInterval(restartTimer)
              game.levelTime = ""
            }
          }, 1000)
          
          setTimeout(function() {
            // gameView.pause = false;
            // gameView.start();
            canvas.style =  Gradients[Math.floor(Math.random() * 12)];  
            game.currentLevel += 1
            gameLoop(level+1)
            game.startTime = Date.now();

          }, 6000)
         
        }

          
      }, 10)
    
        
    }


    
  
//     0: friendlyCircle { 
// area: 0,
// color: "",
// growSpeed: 0,
// isGrowing: 1,
// maxRad: 500,
// pos: [0,0]
  // }
  gameLoop(1);  

  


});
