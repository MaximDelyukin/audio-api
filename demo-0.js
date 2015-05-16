
var context = new window.AudioContext();
var buffer, source, destination; 
var loadSoundFile = function(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'arraybuffer'; // важно
	xhr.onload = function(e) {
		context.decodeAudioData(this.response,
		function(decodedArrayBuffer) {
			buffer = decodedArrayBuffer;
		},
		function(e) {
			console.log('Error decoding file', e);
		});
	};
	xhr.send();
};

/*
var filterNode = context.createBiquadFilter(); 
filterNode.type = 1;
filterNode.frequency.value = 1000;
filterNode.frequency.Q = 1;
*/

var play = function(){
	source = context.createBufferSource();
	source.buffer = buffer;
	destination = context.destination;
	/*
	source.connect(filterNode);
	filterNode.connect(destination);
	*/
	source.connect(destination);
	source.start(0);
};

var stop = function(){
	source.stop(0);
};

loadSoundFile('https://raw.githubusercontent.com/MaximDelyukin/audio-api/master/car.ogg');
//play();

