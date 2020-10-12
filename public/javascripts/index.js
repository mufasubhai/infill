// const axios = require('axios');
import Circle from './components/circle'
import Game from './components/game'
const GameView = require("./components/game_view");
import { Levels, Gradients } from "./components/elements";
import { dist } from './components/util'
import enemyCircle from './components/enemy_circle'
import friendlyCircle from './components/friendly_circle'
import * as Tone from 'tone'
import * as firebase from 'firebase/app';
import 'firebase/database';


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.23.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional


  var firebaseConfig = {
    apiKey: "AIzaSyDBjU8qJqQUF48NESEUI9zwYIAPkLDWKYM",
    authDomain: "infill-c09a6.firebaseapp.com",
    databaseURL: "https://infill-c09a6.firebaseio.com",
    projectId: "infill-c09a6",
    storageBucket: "infill-c09a6.appspot.com",
    messagingSenderId: "269686008412",
    appId: "1:269686008412:web:7f71581e3398798da11499",
    measurementId: "G-DTBBC0L6Q2"
  };
//   // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let fireBaseDB = firebase.database();
//   firebase.analytics();
// </script>

        // document.body.addEventListener("keydown", (e) => {
  //   keys[e.keyCode] = true;
  // });
  // document.body.addEventListener("keyup", (e) => {
  //   keys[e.keyCode] = false;
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


document.addEventListener("DOMContentLoaded", () => {

  // initialization
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
  
  const canvas = document.getElementById("game-canvas");
  canvas.width = "932";
  canvas.height = "632";
  canvas.style =  Gradients[Math.floor(Math.random() * 12)];  
  
  const ctx = canvas.getContext("2d");

  const levels = Levels;
  const game = new Game();
  let currentLevel = 1;
  let finalScore = game.finalScore;
  let gameView = new GameView(ctx, game)
  let timed = game.levelTime
  gameView.start();

// click listener
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
  
  // tone.js
  const tones = [ "eb4", "eb3", "eb2", "eb5", "f2", "f3", "f4", "f5", "ab2", "ab3", "ab4", "c2", "c3", "c4", "c5", "db2", "db3", "db4", "db5", "db6", "eb6","f6" , "ab6", "c6"]
  const notes = [ "1n", "2n", "3n", "4n", "8n", "16n" ]       
  const pingPong = new Tone.PingPongDelay("2n", .4).toDestination();
  const phaser = new Tone.Phaser({frequency: 15,octaves: 5,baseFrequency: 10000}).toDestination();
  let synth1 = new Tone.MonoSynth().toDestination().connect(pingPong, phaser);
  let synth2 = new Tone.AMSynth().toDestination().connect(pingPong);
  Tone.Master.mute = false;
  

  const restartGame = () => {
  game.gameOver = false;
    currentLevel = 1;
    game.finalScore = 0;
    finalScore = 0;
    game.startTime = Date.now();
    gameLoop(1);
  }

  

  const gameLoop = (level) => {
    
    ctx.clearRect(0,0,1000,800)
    game.buildLevel(levels[level]);
    gameView.pause = false;
    gameView.start();

      let currentLevelLoop = window.setInterval(function() {
     

        if(game.gameOver) {
              gameView.pause = true;
              clearInterval(currentLevelLoop)
            // const winnerWinnerModal = document.getElementById('winner_winner')
        }
  
        if (currentLevel > Object.keys(levels).length - 1 ) {
          game.gameOver = true;
            gameView.pause = true;
        }

        if ((game.levelTimer() <= 0.01) && (game.overallScore() < 50)) {
          game.startTime = 0;
          game.gameOver = true;
          
          // game.startTime = Date.now()
          // gameView.pause = true;
          // clearInterval(currentLevelLoop)
          
          
        } else if ((game.levelTimer() <= 0.01) && (game.overallScore() > 50)) {
          game.startTime = 0;
          game.finalScore += game.overallScore();
          clearInterval(currentLevelLoop)
          gameView.pause = true;
          // ctx.clearRect(0, 0, 1000, 800);
          
          timed = 3;
          
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
            if (game.currentLevel === 10) {
              game.gameOver = true;
              game.currentLevel -= 1;
            }
            
            gameLoop(level+1)
            game.startTime = Date.now();

          }, 4000)
         
        }

          
      }, 10)
    
        
    }


  gameLoop(1);    

});
