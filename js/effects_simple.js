window.AudioContext = window.AudioContext || window.webkitAudioContext;

// Variable declarations: used across multiple functions
// TODO: move vars out of global scope
var audioContext = new AudioContext();

var audioInput = null;

// unsure if this node actually connects to anything...
// var effectInput = null;

// used across effects functions
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
var lastEffect = -1;

// Functions re-sorted in order they are called
// First calls at bottom of this document

function initAudio() {
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
    navigator.getUserMedia(constraints, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });

    // Chrome and Firefox trigger the error message
    // TODO: Experiment when other soures are available
    if ((typeof MediaStreamTrack === 'undefined')||(!MediaStreamTrack.getSources)){
        console.log("This browser does not support MediaStreamTrack, so doesn't support selecting sources.\n\nTry Chrome Canary.");
    } else {
        MediaStreamTrack.getSources(gotSources);
    }

    // Activates selection from effects menu
    // document.getElementById("effect").onchange=changeEffect;
}

// main processing function for audio nodes
function gotStream(stream) {
    console.log('Calling gotStream()');

    // ??? Create an AudioNode from the stream ?
    var input = audioContext.createMediaStreamSource(stream);
    // moved out of global scope
    var outputMix = null;

    audioInput = convertToMono( input );

    // establish gain nodes
    outputMix = audioContext.createGain();
    dryGain = audioContext.createGain();
    wetGain = audioContext.createGain();
    // effectInput = audioContext.createGain();

    // Reformed sequence of connections - no visuals    
    audioInput.connect(dryGain);
    // audioInput.connect(effectInput);
    dryGain.connect(outputMix);
    wetGain.connect(outputMix);
    outputMix.connect( audioContext.destination);

    changeEffect(); // Initiates first sound effect
}

function convertToMono( input ) {
    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}


// Called to add a source other than live microphone
// Not tested out yet
function gotSources(sourceInfos) {
    var audioSelect = document.getElementById("audioinput");
    while (audioSelect.firstChild)
        audioSelect.removeChild(audioSelect.firstChild);

    for (var i = 0; i != sourceInfos.length; ++i) {
        var sourceInfo = sourceInfos[i];
        if (sourceInfo.kind === 'audio') {
            var option = document.createElement("option");
            option.value = sourceInfo.id;
            option.text = sourceInfo.label || 'input ' + (audioSelect.length + 1);
            audioSelect.appendChild(option);
        }
    }
}



function keyPress(ev) {
    var oldEffect = document.getElementById("effect").selectedIndex;
    var newEffect = oldEffect;
    switch (ev.keyCode) {
      case 50: // 'r'
        newEffect = 1;
        break;
      case 49: // 'c'
        newEffect = 8;
        break;
      case 51: // 'p'
        newEffect = 10;
        break;
      default:
        console.log(ev.keyCode);
    }
    if (newEffect != oldEffect) {
        document.getElementById("effect").selectedIndex = newEffect;
        changeEffect();
    }
}

function changeEffect() {
    // the sound effect currently selected,
    // moved out of global scope
    var currentEffectNode = null;

    dtime = null;
    dregen = null;
    
    // disengage with previous effects
    if (currentEffectNode) 
        currentEffectNode.disconnect();
    // if (effectInput)
        // effectInput.disconnect();


    var effect = document.getElementById("effect").selectedIndex;
    var effectControls = document.getElementById("controls");
    // Code smell: does lastEffect need to be in global scope?
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


function createDelay() {
    var delayNode = audioContext.createDelay();

    delayNode.delayTime.value = parseFloat( document.getElementById("dtime").value );
    dtime = delayNode;

    var gainNode = audioContext.createGain();
    gainNode.gain.value = parseFloat( document.getElementById("dregen").value );
    dregen = gainNode;

    gainNode.connect( delayNode );
    delayNode.connect( gainNode );
    delayNode.connect( wetGain );

    return delayNode;
}

// Start off the audio
window.addEventListener('load', initAudio );

// Listen for user input
window.addEventListener('keydown', keyPress );
