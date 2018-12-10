"use strict";

function setup()
{
	noCanvas();
	let exampleOfVisualProperties = new VisualProperties(
		SHAPES.circle,
		color("red"));
}

window.frequencyGlobal = 0;
window.activeAgents = [];

let sketchColor = function(sketch)
{
	sketch.audioContext;
	sketch.mic;
	sketch.pitch;
	sketch.ctx;
	
	//sketch.resetUserCanvas = true;
	
	sketch.scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	
	sketch.setup = function()
	{
		sketch.ctx = sketch.createCanvas(800,500).parent('cointainer-color');
		sketch.background(230);
		sketch.audioContext = getAudioContext();
		sketch.mic = new p5.AudioIn();
		sketch.mic.start(sketch.startPitch);
		spawnNewAgent
		(
			new CircleAgent(
				sketch.width / 4,
				sketch.height / 2,
				3,
				new VisualProperties(SHAPES.circle, "#881188")
			)
		);
		
		spawnNewAgent
		(
			new CircleAgent(
				sketch.width / 2,
				sketch.height / 2,
				3,
				new VisualProperties(SHAPES.circle, "#001188")
			)
		);
		//p5UserSketch = new p5(userSketch);
	}

	sketch.draw = function()
	{
		//console.log(window.frequencyGlobal);
		updateAgents(window.activeAgents);
		cleanDeadAgents(window.activeAgents, false);
		sketch.background(200);
		drawAgents(window.activeAgents, sketch);
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
				window.frequencyGlobal = frequency;
				let midiNum = freqToMidi(frequency);
				let currentNote = sketch.scale[midiNum % 12];
				/*
				if(currentNote == 'C'){
					sketch.noteC(frequency);
				}
				*/
			}
			sketch.getPitch();
		})
	}
	
	/*
	sketch.noteC = function (frequency){
		sketch.ellipse(0, 0, frequency/2, frequency/2);
		sketch.fill(255,0,0);
		sketch.noStroke();
	}
	*/
}

function updateAgents(arrayWithAgents)
{
	arrayWithAgents.forEach( function ( element, index, arr)
	{
		element.updateCycle();
	});
}

/**
 * removes dead agents from agents array and returns the count or the agents
 * that were removed
 * @param  {Array}  arrayWithAgents array with active and dead agents
 * @param  {Boolean} returnObjects    true if removed agents needed
 * @return {Integer or Array}       returns Integer amount killed or Array
 * with dead agents
 */
function cleanDeadAgents(arrayWithAgents, returnObjects = false)
{
	let killCount = 0;
	let killedObjects = [];

	arrayWithAgents.forEach( function(element, index, arr)
	{
		if (!element.agentAlive)
		{
			killedObjects.push(element);
			killCount ++;
			arr.splice(index, 1);
		}
	});

	if (returnObjects)
	{
		return killedObjects;
	}
	else
	{
		return killCount;
	}
}

function spawnNewAgent(agent)
{
	window.activeAgents.push(agent);
}

function drawAgents(arrayWithAgents, ctx)
{
	arrayWithAgents.forEach( function ( element, index, arr)
	{
		element.drawLocation(ctx);
	});
}

let p5SketchColor = new p5(sketchColor);