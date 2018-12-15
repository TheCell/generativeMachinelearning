"use strict";

function setup()
{
	noCanvas();
}

window.frequencyGlobal = 0;
window.activeAgents = [];
let numberOfModes = 3;
window.currentMode = getRandomInt(numberOfModes); // 0 based
window.fadeDrawing = false;

if (window.currentMode == 1 || window.currentMode == 2)
{
	if (Math.random() > 0.5)
	{
		window.fadeDrawing = true;
	}
}

console.log(`Mode: ${window.currentMode}, fading: ${window.fadeDrawing}`);

let sketchColor = function(sketch)
{
	sketch.audioContext;
	sketch.mic;
	sketch.pitch;
	sketch.ctx;
	sketch.backgroundColor = COLORPALETTE[COLORPALETTE.length * Math.random() << 0];
	
	//sketch.resetUserCanvas = true;
	
	sketch.scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	
	sketch.setup = function()
	{
		sketch.ctx = sketch.createCanvas(800,500).parent('cointainer-color');
		sketch.background(sketch.backgroundColor);
		sketch.audioContext = getAudioContext();
		sketch.mic = new p5.AudioIn();
		sketch.mic.start(sketch.startPitch);
		sketch.ctx.id("generativeCanvas");
	}

	sketch.draw = function()
	{
		updateAgents(window.activeAgents);
		cleanDeadAgents(window.activeAgents, false);
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
			if (window.fadeDrawing)
			{
				sketch.background(sketch.backgroundColor.slice(0, 7) + "11");
			}

			if (frequency)
			{
				window.frequencyGlobal = frequency;
				let midiNum = freqToMidi(frequency);
				let currentNote = sketch.scale[midiNum % 12];

				// BEHOLD: this is where the construction zone begins. I am sorry
				switch(currentNote)
				{
					case 'C':
						if (window.currentMode == 0)
						{
							if (window.activeAgents.length < 15)
							{
								spawnNewAgent(
									new CircleAgentMode0C(
										sketch.width / 2,
										sketch.height / 2,
										1 + 3 * Math.random(),
										new VisualProperties(1)
								));	
							}
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(),
									"left"
								));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties();
							visualProps.width = 2;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									visualProps
								));
						}
					break;
					case 'C#':
						if (window.currentMode == 0)
						{
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties()
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties();
							visualProps.width = 2;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									visualProps
								));
						}
					break;
					case 'D':
						if (window.currentMode == 0)
						{
						}
						else if (window.currentMode == 1)
						{
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties();
							visualProps.width = 2;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									visualProps
								));
						}
					break;
					case 'D#':
						if (window.currentMode == 0)
						{
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties()
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties();
							visualProps.width = 2;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									visualProps
								));
						}
					break;
					case 'E':
						if (window.currentMode == 0)
						{
							if (window.activeAgents.length < 7)
							{
								spawnNewAgent(
									new CircleAgentMode0E(
										sketch.width / 2,
										sketch.height / 2,
										1 + 3 * Math.random(),
										new VisualProperties()
								));
							}
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(),
									"right"
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties();
							visualProps.width = 2;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									visualProps
								));
						}
					break;
					case 'F':
						if (window.currentMode == 0)
						{
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(),
									"up"
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties();
							visualProps.width = 2;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 2 * Math.random(),
									visualProps
								));
						}
					break;
					case 'F#':
						if (window.currentMode == 0)
						{
						}
						else if (window.currentMode == 1)
						{
							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									new VisualProperties(),
									"down"
							));
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties();
							visualProps.width = 3;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									visualProps
								));
						}
					break;
					case 'G':
						if (window.currentMode == 0)
						{
						}
						else if (window.currentMode == 1)
						{
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties();
							visualProps.width = 3;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									visualProps
								));
						}
					break;
					case 'G#':
						if (window.currentMode == 0)
						{
						}
						else if (window.currentMode == 1)
						{
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties();
							visualProps.width = 3;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									visualProps
								));
						}
					break;
					case 'A':
						if (window.currentMode == 0)
						{
						}
						else if (window.currentMode == 1)
						{
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties();
							visualProps.width = 4;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									visualProps
								));
						}
					break;
					case 'A#':
						if (window.currentMode == 0)
						{
						}
						else if (window.currentMode == 1)
						{
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties();
							visualProps.width = 4;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									visualProps
								));
						}
					break;
					case 'B':
						if (window.currentMode == 0)
						{
						}
						else if (window.currentMode == 1)
						{
						}
						else if (window.currentMode == 2)
						{
							let visualProps = new VisualProperties();
							visualProps.width = 4;

							spawnNewAgent(
								new PerlinAgentMode0C(
									sketch.width / 2,
									sketch.height / 2,
									1 + 3 * Math.random(),
									visualProps
								));
						}
					break;
					default:
					break;
				}
			}
			sketch.getPitch();
		})
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