function setup(){

	noCanvas();


}
let frequencyGlobal = 0;

let sketchColor = function(sketch){

	sketch.audioContext;
	sketch.mic;
	sketch.pitch;
	
	//sketch.resetUserCanvas = true;
	
	sketch.scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	
	sketch.setup = function()
	{
		sketch.createCanvas(800,500).parent('cointainer-color');
		sketch.background(230);
		sketch.audioContext = getAudioContext();
		sketch.mic = new p5.AudioIn();
		sketch.mic.start(sketch.startPitch);
		//p5UserSketch = new p5(userSketch);
	}

	sketch.draw = function(){

		//console.log(frequencyGlobal);

	}
	
	sketch.startPitch = function ()
	{
		sketch.pitch = ml5.pitchDetection('./model/', sketch.audioContext , sketch.mic.stream, sketch.modelLoaded);
	}
	
	sketch.modelLoaded = function ()
	{
		//sketch.select('#status').html('Model Loaded');
		sketch.getPitch();
	}
	
	sketch.getPitch = function ()
	{
		sketch.pitch.getPitch(function(err, frequency)
		{
			if (frequency)
			{
				frequencyGlobal = frequency;
				midiNum = freqToMidi(frequency);
				currentNote = sketch.scale[midiNum % 12];
				if(currentNote == 'C'){
					sketch.noteC(frequency);
				}
			}
			sketch.getPitch();
		})
	}
	
	sketch.noteC = function (frequency){
		sketch.ellipse(0, 0, frequency/2, frequency/2);
		sketch.fill(255,0,0);
		sketch.noStroke();
	}


}
p5SketchColor = new p5(sketchColor);
