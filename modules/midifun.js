import {WebMidi} from "/node_modules/webmidi/dist/esm/webmidi.esm.min.js";
//import * as Tone from "/node_modules/tone/build/Tone.js";
let myInput;
let pageBody = document.querySelector("body");
let synth;
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
    buildInterface();
    // Inputs
    //WebMidi.inputs.forEach(input => console.log(input.manufacturer, input.name));
    WebMidi.inputs.forEach(input => instruments.push(input.name));
    const myInput = WebMidi.getInputByName(instruments[0]);
    myInput.addListener("noteon", e => {
        console.log(e.note.identifier, e.message.channel);
        synth.triggerAttackRelease(e.note.identifier, "8n");
        console.log(synth);
    })

    // Outputs
    console.log("outputs");
    WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));

}
function buildInterface(){
    let clickySpot = document.createElement("button");
    clickySpot.innerText = "Zoinks";
    pageBody.appendChild(clickySpot);
    clickySpot.addEventListener("click", ctxStarter);
}
function ctxStarter(){
    Tone.start();
    console.log("start the bork");
    synth = new Tone.Synth().toDestination();
}