let audioContext;
let mic;
let pitch;

let resetUserCanvas = true;

const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function setup()
{
	noCanvas();
	audioContext = getAudioContext();
	mic = new p5.AudioIn();
	mic.start(startPitch);

	//p5UserSketch = new p5(userSketch);
}

function startPitch()
{
	pitch = ml5.pitchDetection('./model/', audioContext , mic.stream, modelLoaded);
}

function modelLoaded()
{
	select('#status').html('Model Loaded');
	getPitch();
}

function getPitch()
{
	pitch.getPitch(function(err, frequency)
	{
		if (frequency)
		{
			//select('#result').html(frequency);
			//console.log(frequency);
			let midiNum = freqToMidi(frequency);
			currentNote = scale[midiNum % 12];
			select('#currentNote').html(currentNote);
			 console.log(currentNote);
		}
		else
		{
		select('#currentNote').html('No pitch detected');
		}
		getPitch();
	})
}

