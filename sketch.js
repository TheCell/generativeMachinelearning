"use strict";
// For perf optimisation, 
// https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#p5-performance-tips
p5.disableFriendlyErrors = true; // disables FES

function setup()
{
	noCanvas();
}

window.frequencyGlobal = 0;
window.activeAgents = [];
let numberOfModes = 7;
window.currentMode = getRandomInt(numberOfModes); // 0 based
//window.currentMode = 6;
window.fadeDrawing = false;

if (window.currentMode == 0 || window.currentMode == 1 || window.currentMode == 2)
{
	if (Math.random() > 0.7)
	{
		window.fadeDrawing = true;
	}
}

document.getElementById("modeInfo").innerHTML = `Mode: ${window.currentMode}, fading: ${window.fadeDrawing}, colorpalette(${colorPaletteKey}): ${COLORPALETTE}`;
console.log(`Mode: ${window.currentMode}, fading: ${window.fadeDrawing}, colorpalette(${colorPaletteKey}): ${COLORPALETTE}`);

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
		sketch.ctx = sketch.createCanvas(windowWidth, windowHeight).parent('cointainer-color');
		sketch.ctx.id("generativeCanvas");
		sketch.background(sketch.backgroundColor);
		sketch.audioContext = getAudioContext();
		sketch.mic = new p5.AudioIn();
		sketch.mic.start(sketch.startPitch);

		if (sketch.audioContext.state !== 'running')
		{
			document.getElementById("startButton").disabled = false;
		}

		document.bgColor = sketch.backgroundColor.slice(0, 7);
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
		sketch.updateGlobalFrequency();
		sketch.spawnAgents();
	}

	sketch.updateGlobalFrequency = function ()
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
			}

			sketch.updateGlobalFrequency();
		});
	}
	
	sketch.spawnAgents = function ()
	{
		if (window.frequencyGlobal)
		{
			let midiNum = freqToMidi(window.frequencyGlobal);
			let currentNote = sketch.scale[midiNum % 12];

			let visualProps;
			let direction;

			// BEHOLD: this is where the construction zone begins. I am sorry
			// If I die you are responsible that nobody will ever have to read through this. KILL IT
			switch(currentNote)
			{
				case 'A':
					visualProps = new VisualProperties(0);

					if (window.currentMode == 2)
					{
						visualProps.width = 2;
					}
				break;
				case 'A#':
					visualProps = new VisualProperties(1);
					
					if (window.currentMode == 2)
					{
						visualProps.width = 2;
					}
				break;
				case 'B':
					visualProps = new VisualProperties(2);
					if (window.currentMode == 2)
					{
						visualProps.width = 2;
					}
				break;
				case 'C':
					visualProps = new VisualProperties(3);

					if (window.currentMode == 2)
					{
						visualProps.width = 3;
					}
				break;
				case 'C#':
					visualProps = new VisualProperties(4);
					
					if (window.currentMode == 2)
					{
						visualProps.width = 3;
					}
					break;
				case 'D':
					visualProps = new VisualProperties(5);
					
					if (window.currentMode == 2)
					{
						visualProps.width = 3;
					}
					break;
				case 'D#':
					visualProps = new VisualProperties(6);
					
					if (window.currentMode == 2)
					{
						visualProps.width = 4;
					}
					break;
				case 'E':
					visualProps = new VisualProperties(7);

					if (window.currentMode == 1)
					{
						direction = "right";
					}
					else if (window.currentMode == 2)
					{
						visualProps.width = 4;
					}
				break;
				case 'F':
					visualProps = new VisualProperties(8);

					if (window.currentMode == 1)
					{
						direction = "up";
					}
					else if (window.currentMode == 2)
					{
						visualProps.width = 4;
					}
				break;
				case 'F#':
					visualProps = new VisualProperties(9);

					if (window.currentMode == 1)
					{
						direction = "down";
					}
					else if (window.currentMode == 2)
					{
						visualProps.width = 6;
					}
				break;
				case 'G':
					visualProps = new VisualProperties(10);
					
					if (window.currentMode == 2)
					{
						visualProps.width = 6;
					}
				break;
				case 'G#':
					visualProps = new VisualProperties(11);
						
					if (window.currentMode == 2)
					{
						visualProps.width = 6;
					}
				break;
				default:
					visualProps = new VisualProperties();
				break;
			}

			if (window.currentMode == 0)
			{
				spawnNewAgent(
					new CircleAgentMode0C(
						sketch.width / 2,
						sketch.height / 2,
						1 + 3 * Math.random(),
						visualProps
				));	
			}
			else if (window.currentMode == 1)
			{
				spawnNewAgent(
					new PerlinAgentMode0C(
						sketch.width / 2,
						sketch.height / 2,
						1 + 3 * Math.random(),
						visualProps
				));
			}
			else if (window.currentMode == 2)
			{
				if (typeof(direction) != "undefined")
				{
					spawnNewAgent(
						new PerlinAgentMode0C(
							sketch.width / 2,
							sketch.height / 2,
							1 + 3 * Math.random(),
							visualProps,
							direction
					));
				}
				else
				{
					spawnNewAgent(
						new PerlinAgentMode0C(
							sketch.width / 2,
							sketch.height / 2,
							1 + 3 * Math.random(),
							visualProps
					));
				}
			}
			else if (window.currentMode == 3)
			{
				spawnNewAgent(
					new SquareAgentMode0D(
						sketch.width / 2,
						sketch.height / 2,
						1 + 2 * Math.random(),
						visualProps
				));
			}
			else if (window.currentMode == 4)
			{
				spawnNewAgent(
					new FrequencyAgent(
						sketch.width / 2,
						sketch.height / 2,
						1 + 3 * Math.random(),
						visualProps
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
						visualProps,
						undefinedVar,
						random(0, Math.PI * 2),
						sketch.width,
						sketch.height
				));
			}
			else if (window.currentMode == 6)
			{
				spawnNewAgent(
					new TriangleAgentMode0D(
						sketch.width / 2,
						sketch.height / 2,
						2 * Math.random(),
						visualProps
				));
			}
		}

		if (window.fadeDrawing)
		{
			setTimeout(sketch.spawnAgents, 100);
		}
		else
		{
			setTimeout(sketch.spawnAgents, 300);
		}
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