import {WebMidi} from "/node_modules/webmidi/dist/esm/webmidi.esm.min.js";
import * as Tone from "/node_modules/tone/build/Tone.js";
let myInput;
const synth = new Tone.Synth().toDestination();
let instruments = [];
export default function midifun(){
    console.log("midifun is ready to go");
    WebMidi
        .enable()
        //.then(() => console.log("WebMidi enabled!"))
        .then(onEnabled)
        .catch(err => alert(err));
}

function onEnabled() {
  
    // Inputs
    //WebMidi.inputs.forEach(input => console.log(input.manufacturer, input.name));
    WebMidi.inputs.forEach(input => instruments.push(input.name));
    const myInput = WebMidi.getInputByName(instruments[0]);
    myInput.addListener("noteon", e => {
        console.log(e.note.identifier, e.message.channel);
        synth.triggerAttackRelease(e.note.identifier, "8n");
    })

    // Outputs
    console.log("outputs");
    WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));

}