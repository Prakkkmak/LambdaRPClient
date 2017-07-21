// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

var sources = {};
var effects = {};

var listener = context.listener;
if(listener.positionX) {
  listener.positionX.value = 0;
  listener.positionY.value = 0;
  listener.positionZ.value = 0;
} else {
  listener.setPosition(0,0,0);
}

function addSource(tagId, stream) {
  sources[tagId] = context.createMediaStreamSource(stream);
}

function removeSource(id) {
  delete sources.id;
}

function instantiatePanner(maxDistance, assignedId) {
  let newPanner;
  newPanner = context.createPanner();
  newPanner.panningModel = 'HRTF';
  newPanner.distanceModel = 'inverse';
  newPanner.refDistance = 1;
  newPanner.maxDistance = maxDistance;
  newPanner.rolloffFactor = 1;
  newPanner.coneInnerAngle = 360;
  newPanner.coneOuterAngle = 0;
  newPanner.coneOuterGain = 0;

  if(newPanner.orientationX) {
    newPanner.orientationX.value = 0;
    newPanner.orientationY.value = 1;
    newPanner.orientationZ.value = 0;
  } else {
    newPanner.setOrientation(0,1,0);
  }
  if(listener.forwardX) {
    listener.forwardX.value = 0;
    listener.forwardY.value = 0;
    listener.forwardZ.value = -1;
    listener.upX.value = 0;
    listener.upY.value = 1;
    listener.upZ.value = 0;
  } else {
    listener.setOrientation(0,0,-1,0,1,0);
  }

  effects[assignedId] = newPanner;

  sources[assignedId].connect(newPanner);

  return newPanner;
}

function instantiateRadio(assignedId){
  let test;
  test = context.createBiquadFilter();

  test.type = "lowshelf";
  test.frequency.value = 1000;
  test.gain.value = 25;

  effects[assignedId] = test;

  sources[assignedId].connect(test);

  return test;
}

var splitterNodes;
function mixSourcesToDest() {

  var mergerNode = context.createChannelMerger(Object.keys(sources).length*2 );

  splitterNodes = {};

  var index = 0;
  for (var key in sources) {
    var value = sources[key];

    splitterNodes[key] = context.createChannelSplitter(2);

    effects[key].connect(splitterNodes[key]);

    splitterNodes[key].connect(mergerNode, 0,index );
    splitterNodes[key].connect(mergerNode, 1,index+1 );

    index += 2;
  }

  mergerNode.connect(context.destination);


}
