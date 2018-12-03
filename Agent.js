"use strict";

class Agent
{
	constructor(
		middlePointX,
		middlePointY,
		spawnX = middlePointX,
		spawnY = middlePointY,
		angle = random(0, Math.PI * 2),
		moveSpeed = options.moveSpeed,
		visualProperties)
	{
		// set properties
		this.moveSpeed = moveSpeed;
		this.agentAlive = true;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.angle = angle;
		this.visualProperties = visualProperties;

		// set middle point
		this.location = createVector(
			middlePointX,
			middlePointY);
	}

	drawLocation()
	{
		if (!this.agentAlive)
		{
			return;
		}
	}

	updateCycle()
	{
		if (!this.agentAlive)
		{
			return;
		}
	}
}