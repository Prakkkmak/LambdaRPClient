navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

var indexDictionary = {}
var netMessages = []

var pGlobal = []

var receivedStream = {}

var mainStream
var config
$(document).ready(function() {
				 $.get("https://service.xirsys.com/ice",
						 {
								 ident: "nauwp",
								 secret: "f77c5e5e-5ab8-11e7-967d-f9bfae806364",
								 domain: "www.nauwptest.com",
								 application: "default",
								 room: "default",
								 secure: 1
						 },
						 function(data, status) {
								 config = data.d

								 config['iceServers'].forEach(function(element){
									 console.log(element['url'])
									 element['urls'] = element['url']
									 delete element['url']
								 });

								 config['iceServers'].splice(6);
								 config['iceServers'].splice(5);
								 config['iceServers'].splice(4);

								 console.log("Data: " + data + "nnStatus: " + status);
				 });
		 });

function bindEvents(p){
	p.on('error', function (err) {
		console.log('error: ', err)
	})

	p.on('signal', function(data) {
		netMessages.push(data)
		console.log(JSON.stringify(data))
	})

	p.on('stream', function(stream) {
    let audio = document.createElement("audio")
		document.body.appendChild(audio)

		receivedStream[Object.keys(indexDictionary)[pGlobal.length-1]] = stream

		audio.id = Object.keys(indexDictionary)[pGlobal.length-1]
		audio.volume = 1
		audio.controls = true
		audio.src = window.URL.createObjectURL(stream)
		audio.play()
	})
}

function initPeer(initiator, key) {
	let pInit = new SimplePeer({
		initiator: initiator,
		stream: mainStream,
		trickle: false,
		config: config
	}, function () { })

	pGlobal.push(pInit)

	indexDictionary[key] =	pGlobal.length-1;


	bindEvents(pInit)
}

function startPeer(initiator, key) {
	if(mainStream == null){
		navigator.getUserMedia({
			video: false,
			audio: true
		}, function (stream) {

			mainStream = stream
			initPeer(initiator, key)
		}, function () {})
	} else {
		initPeer(initiator, key)
	}
}

function sendSignal(index, netMsg) {
	pGlobal[index].signal(netMsg)
}
