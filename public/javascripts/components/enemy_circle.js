import Circle from './circle'
import friendlyCircle from './friendly_circle'
import * as Tone from 'tone'


class enemyCircle extends Circle {
  constructor(options) {
    super(options);
  }

  collideWith(object) {
    if (object instanceof friendlyCircle) {
      this.isGrowing = 1;
    }
  }

  pauseGrowth(time) {
      this.isGrowing = 1;
      setInterval(() => (this.isGrowing = 0), time)
  }

  // playSound() {
  
  //       let tones = [
  //           "eb4",
  //           "eb3",
  //           "eb2",
  //           "eb5",
  //           "f2",
  //           "f3",
  //           "f4",
  //           "f5",
  //           "ab2",
  //           "ab3",
  //           "ab4",
  //           "c1",
  //           "c2",
  //           "c3",
  //           "c4",
  //           "c5",
  //           "db2",
  //           "db3",
  //           "db4",
  //           "db5"
  //       ]

  //       let notes = [
  //           "1n",
  //           "2n",
  //           "3n",
  //           "4n",
  //           "8n",
  //           "16n"
  //       ]

  //       let randomNote = notes[Math.floor(Math.random() * 5)]
  //       let randomTone = tones[Math.floor(Math.random() * 19)]
  //       synth.triggerAttackRelease(randomTone, randomNote);
                    
        
  //       const pingPong = new Tone.PingPongDelay("1n", 0.5).toDestination();
  //       const synth = new Tone.AMSynth().toDestination().connect(pingPong);
  //       const synth = new Tone.AMSynth().toDestination()
  // }
}

export default enemyCircle;

