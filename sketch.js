"use strict";

function setup()
{
	noCanvas();
}

window.frequencyGlobal = 0;
window.activeAgents = [];
let numberOfModes = 6;
window.currentMode = getRandomInt(numberOfModes); // 0 based
//window.currentMode = 0;
window.fadeDrawing = false;

if (window.currentMode == 0 || window.currentMode == 1 || window.currentMode == 2)
{
	if (Math.random() > 0.5)
	{
		window.fadeDrawing = true;
	}
}

console.log(`Mode: ${window.currentMode}, fading: ${window.fadeDrawing}, colorpalette: ${COLORPALETTE}`);

let sketchColor = function(sketch)
{
	sketch.audioContext;
	sketch.mic;
	sketch.pitch;
	sketch.ctx;
	sketch.backgroundColor = COLORPALETTE[COLORPALETTE.length * Math.random() << 0];
	//sketch.resetUserCanvas = true;
	
	/**
	 * Note: frequence
	 * C: 261
	 * C#: 277
	 * D: 293
	 * D#: 311
	 * E: 329
	 * F: 249
	 * F#: 369
	 * G: 391
	 * G#: 415
	 * A: 440
	 * A#: 466
	 * B: 246
	 */
	sketch.scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	
	sketch.setup = function()
	{
		sketch.ctx = sketch.createCanvas(800,500).parent('cointainer-color');
		sketch.ctx.id("generativeCanvas");
		sketch.background(sketch.backgroundColor);
		sketch.audioContext = getAudioContext();
		sketch.mic = new p5.AudioIn();
		sketch.mic.start(sketch.startPitch);
	}

	sketch.draw = function()
	{
		updateAgents(window.activeAgents);
		cleanDeadAgents(window.activeAgents, false);
		
		if (window.fadeDrawing)
		{
			sketch.background(sketch.backgroundColor.slice(0, 7) + "11");
		}

		drawAgents(window.activeAgents, sketch);
	}
	
	sketch.startPitch = function ()
	{
		sketch.pitch = ml5.pitchDetection('./model/', sketch.audioContext , sketch.mic.stream, sketch.modelLoaded);
	}
	
	sketch.modelLoaded = function ()
	{
		sketch.getPitch();
	}
	
	sketch.getPitch = function ()
	{
		sketch.pitch.getPitch(function(err, frequency)
		{
			if (err)
			{
				console.log(err);
			}

			if (frequency)
			{
				window.frequencyGlobal = frequency;
				let midiNum = freqToMidi(frequency);
				let currentNote = sketch.scale[midiNum % 12];

				// BEHOLD: this is where the construction zone begins. I am sorry
				// If I die you are responsible that nobody will ever have to read through this. KILL IT
				switch(currentNote)
				{
					case 'A':
						if (window.currentMode == 0)
						{
							spawnNewAgent(
								new CircleAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(0)
							));	
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(0)
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties(0);
							visualProps.width = 2;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									visualProps
								));
						}
						else if (window.currentMode == 3)
						{
							spawnNewAgent(
								new SquareAgentMode0D(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									new VisualProperties(0)
							));
						}
						else if (window.currentMode == 4)
						{
							spawnNewAgent(
								new FrequencyAgent(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(0)
								));
						}
						else if (window.currentMode == 5)
						{
							let undefinedVar;

							spawnNewAgent(
								new FrequencyAgentSmooth(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(0),
									undefinedVar,
									random(0, Math.PI * 2),
									sketch.width,
									sketch.height
								));
						}
					break;
					case 'A#':
						if (window.currentMode == 0)
						{
							spawnNewAgent(
								new CircleAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(1)
							));	
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(1)
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties(1);
							visualProps.width = 2;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									visualProps
								));
						}
						else if (window.currentMode == 3)
						{
							spawnNewAgent(
								new SquareAgentMode0D(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									new VisualProperties(1)
							));
						}
						else if (window.currentMode == 4)
						{
							spawnNewAgent(
								new FrequencyAgent(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(1)
								));
						}
						else if (window.currentMode == 5)
						{
							let undefinedVar;

							spawnNewAgent(
								new FrequencyAgentSmooth(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(1),
									undefinedVar,
									random(0, Math.PI * 2),
									sketch.width,
									sketch.height
								));
						}
					break;
					case 'B':
						if (window.currentMode == 0)
						{
							spawnNewAgent(
								new CircleAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(2)
							));	
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(2)
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties(2);
							visualProps.width = 2;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									visualProps
								));
						}
						else if (window.currentMode == 3)
						{
							spawnNewAgent(
								new SquareAgentMode0D(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									new VisualProperties(2)
							));
						}
						else if (window.currentMode == 4)
						{
							spawnNewAgent(
								new FrequencyAgent(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(2)
								));
						}
						else if (window.currentMode == 5)
						{
							let undefinedVar;

							spawnNewAgent(
								new FrequencyAgentSmooth(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(2),
									undefinedVar,
									random(0, Math.PI * 2),
									sketch.width,
									sketch.height
								));
						}
					break;
					case 'C':
						if (window.currentMode == 0)
						{
							spawnNewAgent(
								new CircleAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(3)
							));	
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(3),
									"left"
								));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties(3);
							visualProps.width = 3;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									visualProps
								));
						}
						else if (window.currentMode == 3)
						{
							spawnNewAgent(
								new SquareAgentMode0D(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									new VisualProperties(3)
							));
						}
						else if (window.currentMode == 4)
						{
							spawnNewAgent(
								new FrequencyAgent(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(3)
								));
						}
						else if (window.currentMode == 5)
						{
							let undefinedVar;

							spawnNewAgent(
								new FrequencyAgentSmooth(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(3),
									undefinedVar,
									random(0, Math.PI * 2),
									sketch.width,
									sketch.height
								));
						}
					break;
					case 'C#':
						if (window.currentMode == 0)
						{
							spawnNewAgent(
								new CircleAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(4)
							));	
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(4)
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties(4);
							visualProps.width = 3;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									visualProps
								));
						}
						else if (window.currentMode == 3){
							spawnNewAgent(
								new SquareAgentMode0D(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									new VisualProperties(4)
							));
						}
						else if (window.currentMode == 4)
						{
							spawnNewAgent(
								new FrequencyAgent(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(4)
								));
						}
						else if (window.currentMode == 5)
						{
							let undefinedVar;

							spawnNewAgent(
								new FrequencyAgentSmooth(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(4),
									undefinedVar,
									random(0, Math.PI * 2),
									sketch.width,
									sketch.height
								));
						}
					break;
					case 'D':
						if (window.currentMode == 0)
						{
							spawnNewAgent(
								new CircleAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(5)
							));	
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(5)
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties(5);
							visualProps.width = 3;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									visualProps
								));
						}
						else if (window.currentMode == 3)
						{
							spawnNewAgent(
								new SquareAgentMode0D(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									new VisualProperties(5)
							));
						}
						else if (window.currentMode == 4)
						{
							spawnNewAgent(
								new FrequencyAgent(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(5)
								));
						}
						else if (window.currentMode == 5)
						{
							let undefinedVar;

							spawnNewAgent(
								new FrequencyAgentSmooth(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(5),
									undefinedVar,
									random(0, Math.PI * 2),
									sketch.width,
									sketch.height
								));
						}
					break;
					case 'D#':
						if (window.currentMode == 0)
						{
							spawnNewAgent(
								new CircleAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(6)
							));	
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(6)
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties(6);
							visualProps.width = 4;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									visualProps
								));
						}
						else if (window.currentMode == 3)
						{
							spawnNewAgent(
								new SquareAgentMode0D(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									new VisualProperties(6)
							));
						}
						else if (window.currentMode == 4)
						{
							spawnNewAgent(
								new FrequencyAgent(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(6)
								));
						}
						else if (window.currentMode == 5)
						{
							let undefinedVar;

							spawnNewAgent(
								new FrequencyAgentSmooth(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(6),
									undefinedVar,
									random(0, Math.PI * 2),
									sketch.width,
									sketch.height
								));
						}
					break;
					case 'E':
						if (window.currentMode == 0)
						{
							spawnNewAgent(
								new CircleAgentMode0E(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(7)
							));
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(7),
									"right"
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties(7);
							visualProps.width = 4;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									visualProps
								));
						}
						else if (window.currentMode == 3)
						{
							spawnNewAgent(
								new SquareAgentMode0D(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									new VisualProperties(7)
							));
						}
						else if (window.currentMode == 4)
						{
							spawnNewAgent(
								new FrequencyAgent(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(7)
								));
						}
						else if (window.currentMode == 5)
						{
							let undefinedVar;

							spawnNewAgent(
								new FrequencyAgentSmooth(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(7),
									undefinedVar,
									random(0, Math.PI * 2),
									sketch.width,
									sketch.height
								));
						}
					break;
					case 'F':
						if (window.currentMode == 0)
						{
							spawnNewAgent(
								new CircleAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(8)
							));	
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(8),
									"up"
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties(8);
							visualProps.width = 4;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									visualProps
								));
						}
						else if (window.currentMode == 3)
						{
							spawnNewAgent(
								new SquareAgentMode0D(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									new VisualProperties(8)
							));
						}
						else if (window.currentMode == 4)
						{
							spawnNewAgent(
								new FrequencyAgent(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(8)
								));
						}
						else if (window.currentMode == 5)
						{
							let undefinedVar;

							spawnNewAgent(
								new FrequencyAgentSmooth(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(8),
									undefinedVar,
									random(0, Math.PI * 2),
									sketch.width,
									sketch.height
								));
						}
					break;
					case 'F#':
						if (window.currentMode == 0)
						{
							spawnNewAgent(
								new CircleAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(9)
							));	
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(9),
									"down"
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties(9);
							visualProps.width = 6;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									visualProps
								));
						}
						else if (window.currentMode == 3)
						{
							spawnNewAgent(
								new SquareAgentMode0D(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									new VisualProperties(9)
							));
						}
						else if (window.currentMode == 4)
						{
							spawnNewAgent(
								new FrequencyAgent(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(9)
								));
						}
						else if (window.currentMode == 5)
						{
							let undefinedVar;

							spawnNewAgent(
								new FrequencyAgentSmooth(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(9),
									undefinedVar,
									random(0, Math.PI * 2),
									sketch.width,
									sketch.height
								));
						}
					break;
					case 'G':
						if (window.currentMode == 0)
						{
							spawnNewAgent(
								new CircleAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(10)
							));	
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(10)
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties(10);
							visualProps.width = 6;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									visualProps
								));
						}
						else if (window.currentMode == 3)
						{
							spawnNewAgent(
								new SquareAgentMode0D(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									new VisualProperties(10)
							));
						}
						else if (window.currentMode == 4)
						{
							spawnNewAgent(
								new FrequencyAgent(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(10)
								));
						}
						else if (window.currentMode == 5)
						{
							let undefinedVar;

							spawnNewAgent(
								new FrequencyAgentSmooth(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(10),
									undefinedVar,
									random(0, Math.PI * 2),
									sketch.width,
									sketch.height
								));
						}
					break;
					case 'G#':
						if (window.currentMode == 0)
						{
							spawnNewAgent(
								new CircleAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(11)
							));	
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(11)
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties(11);
							visualProps.width = 6;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									visualProps
								));
						}
						else if (window.currentMode == 3)
						{
							spawnNewAgent(
								new SquareAgentMode0D(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									new VisualProperties(11)
							));
						}
						else if (window.currentMode == 4)
						{
							spawnNewAgent(
								new FrequencyAgent(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(11)
								));
						}
						else if (window.currentMode == 5)
						{
							let undefinedVar;

							spawnNewAgent(
								new FrequencyAgentSmooth(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(11),
									undefinedVar,
									random(0, Math.PI * 2),
									sketch.width,
									sketch.height
								));
						}
					break;
					default:
					break;
				}
			}

			if (window.fadeDrawing)
			{
				setTimeout(sketch.getPitch, 100);
			}
			else
			{
				setTimeout(sketch.getPitch, 300);
			}
		});
	}
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

function getRandomInt(max)
{
	return Math.floor(Math.random() * Math.floor(max));
}

let p5SketchColor = new p5(sketchColor);