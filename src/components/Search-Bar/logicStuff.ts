import * as Tone from 'tone';

const all_notes = ['A', 'A#', 'B', 'C', 'C#','D', 'D#','E', 'F', 'F#', 'G', 'G#'];
const num_notes = 12;
// Couple intervals which are helpful for building chords
const maj_third = 4; // 4 half steps is one major third
const min_third = 3; // 3 half steps is one minor third
const octive = 3; // Permanent 4 octive baby
const major_scale = [2, 2, 1, 2, 2, 2, 1];
const major_scale_progression = {1: 'Major', 2: 'Minor', 3: 'Minor', 4: 'Major', 5: 'Major', 6:'Minor', 7: 'Diminished'};
const progressions = [[1,4,5], [1,4,1,5], [1,5,6,4], [6,4,1,5], [4,2,5,1]];

// const synth = new Tone.PolySynth().toDestination();
const synth = new Tone.Sampler({urls: {A1: "A1.mp3", A2: "A2.mp3"}, baseUrl: "https://tonejs.github.io/audio/casio/"}).toDestination();
//play a middle 'C' for the duration of an 8th note

export function buildchord(root, mode) {
    // Builds a chord given a note to use as a root and a mode (major or minor)
    if (mode == "Major") {
        let chord_root = root + octive
        let chord_length = 1
        let chord_third = all_notes[(all_notes.indexOf(root) + maj_third) % num_notes] + octive;
        let chord_fifth = all_notes[(all_notes.indexOf(root) + maj_third + min_third) % num_notes] + octive;
        console.log("Notes in chord: ", chord_root, chord_third, chord_fifth);
        synth.triggerAttackRelease([chord_root, chord_third, chord_fifth], chord_length);
    } else if (mode == "Minor") {
        let chord_root = root + octive
        let chord_length = 1
        let chord_third = all_notes[(all_notes.indexOf(root) + min_third) % num_notes] + octive;
        let chord_fifth = all_notes[(all_notes.indexOf(root) + maj_third + min_third) % num_notes] + octive;
        console.log("Notes in chord: ", chord_root, chord_third, chord_fifth);
        synth.triggerAttackRelease([chord_root, chord_third, chord_fifth], chord_length);
    }
}

//Turn to a chord progression
export async function process(key) {
    if (!all_notes.includes(key)) {
        return "Error"
    }

    let randomProgression = Math.floor(Math.random() * progressions.length)
    let randomProgression2 = Math.floor(Math.random() * progressions.length)
    let verse = []
    let chorus = []
    let note = all_notes.indexOf(key)
    let key_scale = []
    for (let i = 0; i < major_scale.length; i++) {
        key_scale[i] = all_notes[note]
        console.log(note, all_notes[note])
        note = (note + major_scale[i]) % 11
    }
    
    for (let i = 0; i < progressions[randomProgression].length; i++) {
        verse.push(key_scale[progressions[randomProgression][i]-1] + " " + major_scale_progression[progressions[randomProgression][i]]);
    }

    for (let i = 0; i < progressions[randomProgression2].length; i++) {
        chorus.push(key_scale[progressions[randomProgression2][i]-1] + " " + major_scale_progression[progressions[randomProgression2][i]]);
    }

    console.log("verse") 
    for (let i = 0; i < verse.length; i++) {
        let someChord = verse[i].split(" ");
        console.log(someChord)
        buildchord(someChord[0], someChord[1]);
        await delay(1000);
    }

     for (let i = 0; i < verse.length; i++) {
        let someChord = verse[i].split(" ");
        console.log(someChord)
        buildchord(someChord[0], someChord[1]);
        await delay(1000);
    }

    console.log("chorus")
    for (let i = 0; i < chorus.length; i++) {
        let someChord = chorus[i].split(" ");
        console.log(someChord)
        buildchord(someChord[0], someChord[1]);
        await delay(1000);
    }

    for (let i = 0; i < chorus.length; i++) {
        let someChord = chorus[i].split(" ");
        console.log(someChord)
        buildchord(someChord[0], someChord[1]);
        await delay(1000);
    }
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}