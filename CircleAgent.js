"use strict";

class CircleAgent
{
	constructor(
		middlePointX,
		middlePointY,
		moveSpeed = moveSpeed,
		visualProperties,
		angle = random(0, Math.PI * 2),
		spawnX = middlePointX,
		spawnY = middlePointY)
	{
		// set properties
		this.moveSpeed = moveSpeed;
		this.agentAlive = true;
		this.angle = angle;
		this.visualProperties = visualProperties;

		// set middle point
		this.location = createVector(
			middlePointX,
			middlePointY);
		this.spawnLocation = createVector(
			spawnX,
			spawnY);
	}

	drawLocation(ctx)
	{
		if (!this.agentAlive)
		{
			return;
		}

		ctx.fill(this.visualProperties.color);
		ctx.noStroke();
		
		ctx.ellipse(this.location.x, this.location.y, window.frequencyGlobal, window.frequencyGlobal);
	}

	updateCycle()
	{
		if (!this.agentAlive)
		{
			return;
		}
	}
}