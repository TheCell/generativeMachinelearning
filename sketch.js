let audioContext;
let mic;
let pitch;

let resetUserCanvas = true;

function setup()
{
	noCanvas();
	audioContext = getAudioContext();
	mic = new p5.AudioIn();
	mic.start(startPitch);

	p5UserSketch = new p5(userSketch);
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
			select('#result').html(frequency);
		}
		else
		{
			select('#result').html('No pitch detected');
		}
		getPitch();
	})
}