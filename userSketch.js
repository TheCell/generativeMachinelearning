// example for multiple sketches
let userSketch = function (sketch)
{
	sketch.setup = function ()
	{
		sketch.createCanvas(200, 200).parent('container');
		sketch.pixelDensity(1);
		sketch.loadPixels();
		sketch.background(0);
	}

	sketch.draw = function ()
	{
		if (resetUserCanvas)
		{
			sketch.background(0);
			resetUserCanvas = false;
		}

		sketch.drawSketch();
	}

	sketch.drawSketch = function (argument)
	{
		if (sketch.mouseIsPressed)
		{
			inTraining = false;
			sketch.stroke(255);
			sketch.strokeWeight(4);
			// this offset though
			sketch.line(
			sketch.mouseX,
			sketch.mouseY,
			sketch.pmouseX,
			sketch.pmouseY);
		}
	}
}
