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
  let firebaseDB = firebase.database();
//   firebase.analytics();
// </script>


document.addEventListener("DOMContentLoaded", () => {
Tone.start();
  // initialization
  document.getElementById('music').addEventListener("click", (e) => {
    let music = document.getElementById('music');
    if (Tone.Master.mute === true) {
      Tone.Master.mute = false;
      music.innerHTML = "Mute Sound"
    
    } else {
      Tone.Master.mute = true;
      music.innerHTML = "Unmute Sound"
    
    }
  })
  

  // restart game
  document.getElementById('restart').addEventListener("click", (e) => {
    const gameOver = document.getElementById('game-over');
              gameOver.style.display = 'none'
    restartGame();
  })
  
  document.getElementById('restart1').addEventListener("click", (e) => {
    restartGame();
  })
  
  const canvas = document.getElementById("game-canvas");
  canvas.width = "932";
  canvas.height = "632";
  canvas.style =  Gradients[Math.floor(Math.random() * 12)];  
  
  const ctx = canvas.getContext("2d");

  const levels = Levels;
  const game = new Game();
  const gameView = new GameView(ctx, game)
  
  let finalScore = game.finalScore;
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

  // firebase scores
  const showScores = (highScores) => {
    const leaderboard = document.getElementById('leaderboard');

    if(leaderboard.childElementCount > 0) {
      while(leaderboard.hasChildNodes()) { leaderboard.removeChild(leaderboard.lastChild); }
    }

    const scores = Object.keys(highScores)
      .map(score => score)
      .sort((a,b) => b - a);
    let row, usernameCell, scoreCell;

    for (var i = 0; i < scores.length; i++) {
      row = leaderboard.insertRow(i);
      usernameCell = row.insertCell(0);
      scoreCell = row.insertCell(1);

      usernameCell.innerHTML = highScores[scores[i]];
      scoreCell.innerHTML = scores[i] / 1000;
    }
  }

  const postScore = (name, score) => {
    const scoreRef = firebaseDB.ref(`highscores/${score * 1000}`);
    scoreRef.set(name);
  };

  const fetchScores = () => {
    firebaseDB.ref(`highscores`).once(`value`).then( snap => {
      let scores = snap.val();
      showScores(scores);
    });
  };

   const removeLowestScore = () => {
    firebaseDB.ref(`highscores`).once(`value`).then( snap => {
      const highScores = snap.val();
      const scores = Object.keys(highScores)
        .map( score => score)
        .sort((a,b) => b - a);
      const lowestScore = scores[scores.length - 1].toString();
      const scoreRefs = firebaseDB.ref(`highscores` + lowestScore);
      console.log(lowestScore)
      scoreRefs.remove().then(fetchScores() );
    });
  };

  fetchScores()
  
  // tone.js
  const tones = [ "eb4", "eb3", "eb2", "eb5", "f2", "f3", "f4", "f5", "ab2", "ab3", "ab4", "c2", "c3", "c4", "c5", "db2", "db3", "db4", "db5", "db6", "eb6","f6" , "ab6", "c6"]
  const notes = [ "1n", "2n", "3n", "4n", "8n", "16n" ]       
  const pingPong = new Tone.PingPongDelay("2n", .4).toDestination();
  const phaser = new Tone.Phaser({frequency: 15,octaves: 5,baseFrequency: 10000}).toDestination();
  let synth1 = new Tone.MonoSynth().toDestination().connect(pingPong, phaser);
  let synth2 = new Tone.AMSynth().toDestination().connect(pingPong);
  Tone.Master.mute = false;
  

  const restartGame = () => {
    gameLoop(1);
    gameView.pause = false;
    // game.start();
    game.gameOver = false;
    game.startTime = Date.now();
    game.currentLevel = 1;
    game.finalScore = 0;
  }

  

  const gameLoop = (level) => {
    game.currentLevel = level;
    ctx.clearRect(0,0,1000,800)
    game.buildLevel(levels[level]);
    gameView.pause = false;
    gameView.start();

      let currentLevelLoop = window.setInterval(function() {
     

        if(game.gameOver) {
            // remove extra inputs

              gameView.pause = true;
              clearInterval(currentLevelLoop)
              const leaderboardCells = document.getElementsByTagName('td');
              const lowestScore = Number(leaderboardCells[leaderboardCells.length - 1].innerHTML);
              const numScores = document.getElementById('leaderboard').lastChild.childElementCount;
              const nameInput = document.createElement('input');
              const scoreSubmit = document.createElement('button');

              
              let gameOver = document.getElementById('game-over');
              
              gameOver.style.display = 'block'

              if(game.finalScore > lowestScore) {
                let name = '';
                nameInput.setAttribute('id', 'nameinput')
                scoreSubmit.setAttribute('id', 'scoresubmit')
                nameInput.setAttribute('type', 'text');
                nameInput.setAttribute('maxlength', '8')
                nameInput.setAttribute('minlength', '2')

                nameInput.addEventListener('change', (e) => {
                  name = e.currentTarget.value;
                })

                scoreSubmit.innerHTML = "Post High Score"
                scoreSubmit.addEventListener('click', (e) => {
                  postScore(name, game.finalScore.toFixed(3));
                  removeLowestScore();
                  // location.reload();
                })
                gameOver.appendChild(nameInput);
                gameOver.appendChild(scoreSubmit)
              }
        }
        
        if (game.currentLevel === 10) {
              game.gameOver = true;
              game.currentLevel -= 1;
            }
        if (game.currentLevel > Object.keys(levels).length - 1 ) {
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
  
          
          timed = 3;
          
          let restartTimer = setInterval(function(){
            if (timed >= 0) {
              
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
            
            
            gameLoop(level + 1)
            game.startTime = Date.now();

          }, 4000)
         
        }

          
      }, 10)
    
        
    }


  gameLoop(1);    

});
