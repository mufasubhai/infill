import Circle from './circle'
import enemyCircle from './enemy_circle'
import * as Tone from 'tone'


class friendlyCircle extends Circle {
    constructor(options) {
        super(options) 

    }

    collideWith(object) {
        if (object instanceof enemyCircle) {
            this.isGrowing = 1;
        } 
    }
    speedGrowth(time) {
        const oldSpeed = this.growSpeed;
        this.growSpeed *= 3;
        setInterval(() => (this.growSpeed = oldSpeed), time)
    }
    
    // playSound() {

    //     let tones = [
    //         "eb4",
    //         "eb3",
    //         "eb2",
    //         "eb5",
    //         "f2",
    //         "f3",
    //         "f4",
    //         "f5",
    //         "ab2",
    //         "ab3",
    //         "ab4",
    //         "c1",
    //         "c2",
    //         "c3",
    //         "c4",
    //         "c5",
    //         "db2",
    //         "db3",
    //         "db4",
    //         "db5"
    //     ]

    //     let notes = [
    //         "1n",
    //         "2n",
    //         "3n",
    //         "4n",
    //         "8n",
    //         "16n"
    //     ]

    //     // performance hit with ping pong delay
    //     // let delayNotes = [
    //     //     "1n",
    //     //     "2n",
    //     //     "3n"
    //     // ]

    //     // let delayDelays = [
    //     //     .1,
    //     //     .2,
    //     //     .3,
    //     //     .4
    //     // ]


    //     let randomNote = notes[Math.floor(Math.random() * 5)]
    //     let randomTone = tones[Math.floor(Math.random() * 19)]
    //     // let randomDelayNote = delayNotes[Math.floor(Math.random() * 2)]
    //     // let randomDelay = delayDelays[Math.floor(Math.random() * 3)]
                    
        
    //     // const pingPong = new Tone.PingPongDelay(randomDelayNote, randomDelay).toDestination();
    //     // const synth = new Tone.Synth().toDestination().connect(pingPong);
    //     synth.triggerAttackRelease(randomTone, randomNote);
    // }
}

export default friendlyCircle;