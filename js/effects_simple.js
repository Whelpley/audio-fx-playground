// * asterisk indicates comments related to Angular conversion

window.AudioContext = window.AudioContext || window.webkitAudioContext;

// Variable declarations: used across multiple functions
// TODO: move vars out of global scope
var audioContext = new AudioContext();

var audioInput = null;

// unsure if this node actually connects to anything...
// var effectInput = null;

// used across effects functions for volume control
var wetGain = null; 
var dryGain = null; 

var dtime = null; // in createDelay(), other effects
var dregen = null; // in createDelay(), other effects

// for selecting audio input
// used in initAudio(), changeInput()
var constraints = 
{
  audio: {
      optional: [{ echoCancellation: false }]
  }
};

// should this be in global scope?
var lastEffect = -1; // in changeEffect(), ...

// Functions re-sorted in order they are called
// First calls at bottom of this document

function initAudio() {
    console.log('Calling initAudio()');        
    var irRRequest = new XMLHttpRequest();
    irRRequest.open("GET", "sounds/cardiod-rear-levelled.wav", true);
    irRRequest.responseType = "arraybuffer";
    irRRequest.onload = function() {
        audioContext.decodeAudioData( irRRequest.response, 
            function(buffer) { 
                // reverbBuffer = buffer; 
            } );
    }
    irRRequest.send();

    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    if (!navigator.getUserMedia)
        return(alert("Error: getUserMedia not supported!"));

    // IF we can getUserMedia, call gotStream
    // used for processing live microphone input
    navigator.getUserMedia(constraints, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });

    // Chrome and Firefox trigger the error message
    // TODO: Experiment when other soures are available
    if ((typeof MediaStreamTrack === 'undefined')||(!MediaStreamTrack.getSources)){
        console.log("This browser does not support MediaStreamTrack, so doesn't support selecting sources.\n\nTry Chrome Canary.");
    } else {
        console.log("MediaStreamTrack.getSources() would be called here.")
        // MediaStreamTrack.getSources(gotSources);
    }

    // Activates selection from effects menu
    // document.getElementById("effect").onchange=changeEffect;
}

// main processing function for audio nodes
function gotStream(stream) {
    console.log('Calling gotStream()');

    // ??? Create an AudioNode from the stream ???
    var input = audioContext.createMediaStreamSource(stream);
    // moved out of global scope
    var outputMix = null;

    audioInput = convertToMono( input );

    // establish gain nodes
    outputMix = audioContext.createGain();
    dryGain = audioContext.createGain();
    wetGain = audioContext.createGain();
    // ??? Does this do anything ???    
    // effectInput = audioContext.createGain();

    // Reformed sequence of connections - no visuals    
    audioInput.connect(dryGain);
    // ??? Does this do anything ???
    // audioInput.connect(effectInput);
    dryGain.connect(outputMix);
    wetGain.connect(outputMix);
    outputMix.connect( audioContext.destination);

    changeEffect(); // Initiates first sound effect
}

function convertToMono( input ) {
    console.log('Calling convertToMono()');    

    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}

function changeEffect() {
    console.log('Calling changeEffect()');    

    // the sound effect currently selected
    // moved out of global scope - where does it belong?
    var currentEffectNode = null;

    // select current effects from uesr selection
    var effect = document.getElementById("effect").selectedIndex;
    var effectControls = document.getElementById("controls");

    // Var's associated with effects are all resest here
    // ??? Better way: object to gather var's ???
    dtime = null;
    dregen = null;
    
    // disengage with previous effects
    if (currentEffectNode) 
        currentEffectNode.disconnect();

    // Code smell: does lastEffect need to be in global scope?
    // IF: there was a Last effect, rather than page loading
    // add display class to effect controls for current effect, remove 
    if (lastEffect > -1)
        effectControls.children[lastEffect].classList.remove("display");
    lastEffect = effect;
    effectControls.children[effect].classList.add("display");

    switch (effect) {
        case 0: // Delay
            currentEffectNode = createDelay();
            break;
     
        default:
            break;
    }
    audioInput.connect( currentEffectNode );
}


// Called to add a source other than live microphone
// Not tested out yet, removing temporarily
// function gotSources(sourceInfos) {
//     console.log('Calling gotSources()');   

//     var audioSelect = document.getElementById("audioinput");

//     while (audioSelect.firstChild)
//         audioSelect.removeChild(audioSelect.firstChild);

//     for (var i = 0; i != sourceInfos.length; ++i) {
//         var sourceInfo = sourceInfos[i];
//         if (sourceInfo.kind === 'audio') {
//             var option = document.createElement("option");
//             option.value = sourceInfo.id;
//             option.text = sourceInfo.label || 'input ' + (audioSelect.length + 1);
//             audioSelect.appendChild(option);
//         }
//     }
// }

// captures the slider values to create a Delay Node
function createDelay() {
    console.log('Calling createDelay()');        
    
    var delayNode = audioContext.createDelay();
    var gainNode = audioContext.createGain();    

    delayNode.delayTime.value = parseFloat( document.getElementById("dtime").value );
    dtime = delayNode;

    gainNode.gain.value = parseFloat( document.getElementById("dregen").value );
    dregen = gainNode;

    gainNode.connect( delayNode );
    delayNode.connect( gainNode );
    delayNode.connect( wetGain );

    return delayNode;
}

// Start off the audio
window.addEventListener('load', initAudio );
