import * as Tone from 'tone';

const all_notes = ['A', 'A#', 'B', 'C', 'C#','D', 'D#','E', 'F', 'F#', 'G', 'G#'];
const major_scale = [2, 2, 1, 2, 2, 2, 1];
const major_scale_progression = {1: 'Major', 2: 'Minor', 3: 'Minor', 4: 'Major', 5: 'Major', 6:'Minor', 7: 'Diminished'};
const progressions = [[1,5], [1,4,5], [1,4,1,5], [1,6,4,5], [1,5,6,4], [6,4,1,5]];

const synth = new Tone.PolySynth().toDestination();
//play a middle 'C' for the duration of an 8th note

//Turn to a chord progression
export function process(key) {
    if (!all_notes.includes(key)) {
        return "Error"
    }
    
    let randProgression = Math.floor(Math.random() * (progressions.length - 0) + 0)
    let song = ""
    let note = all_notes.indexOf(key)
    let key_scale = []
    for (let i = 0; i < major_scale.length; i++) {
        key_scale[i] = all_notes[note]
        note += major_scale[i]
        if (note >= all_notes.length) {
            note = all_notes.length - note - 1
        } 
    }

    for (let i = 0; i < progressions[randProgression].length; i++) {
        song += key_scale[progressions[randProgression][i]-1] + " " + major_scale_progression[progressions[randProgression][i]] + " "
    }

    synth.triggerAttackRelease(["F#4", "A#4", "C#4"], 1);
    return song
}
