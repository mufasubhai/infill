# InFill

[Play InFill](https://mufasubhai.github.io/infill/)
![InFill game start](https://github.com/mufasubhai/infill/blob/master/public/assets/images/Infill.gif?raw=true)

## Overview
InFill is an ambient JavaScript game built using vanilla JavasCript, WebPack, HTML5 Canvas and Tone.js for ambient music. Blue and green circles are your friends. Red and orange? Not so much! Click on circles to grow or pause them. Advance to the next level by occupying more space than the computer.

## Controls 
* Just click on the bubbles!

## Technologies
- JavaScript
- Tone.js
- Webpack
- Firebase
- HTML5 Canvas

## Coming VERY soon
- [ ] Level based gameplay
- [ ] Music from tone.js
- [ ] High Scores using firebase


### Code Snippet: Level Building

```javascript
buildLevel(level) {
        for (let i = 0; i < level.length; i++) {
            for (let j = 0; j< level[0].length; j++) {
                if (level[i][j] === 1) {
                    let circleX = 65 * i;
                    let circleY = 65 * j;
                    let growSpeed = .1 +(Math.floor(Math.random() * 5) *.03);
                    let maxRad = Math.floor(Math.random() * 5) * 100 + 100;
                    let rad = Math.floor(Math.random() * 5) + 10;
                    let colors = [ '#c43e37', '#c45637', '#b37120', '#b32036', '#a68428']
                    let randomColor = colors[Math.floor(Math.random() * 4)]
                    const circle = new enemyCircle({
                        pos: [circleX, circleY],
                        color: randomColor,
                        rad: rad,
                        growSpeed: growSpeed,
                        maxRad: maxRad,
                        isGrowing: 0,
                    })

                    this.enemyCircles.push(circle)

                } else if (level[i][j] === 2) {
                    let circleX = 65 * i;
                    let circleY = 65 * j;   
                    let growSpeed = .1+ (Math.floor(Math.random() * 5) * .03);
                    let maxRad = Math.floor(Math.random() * 5) * 100 + 100;
                    let rad = Math.floor(Math.random() * 5) + 10;
                    let colors = [ '#28a641', '#28a6a4', '#284aa6', '#41338f', '#1f6a87']
                    let randomColor = colors[Math.floor(Math.random() * 4)]
                    
                     const circle = new friendlyCircle({
                       pos: [circleX, circleY],
                       color: randomColor,
                       rad: rad,
                       growSpeed: growSpeed,
                       maxRad: maxRad,
                       isGrowing: 0,
                     });

                    this.friendlyCircles.push(circle);
                } 
            }
        }
    }
```