"use strict";

class FrequencyAgent
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
		this.points = [];
		this.livecycles = 200;
		
		middlePointX = middlePointX - 100 + Math.floor(200 * Math.random());
		middlePointY = middlePointY - 100 + Math.floor(200 * Math.random());
		this.visualProperties.width = 1/1024*window.frequencyGlobal * 100;
		
		// set middle point
		this.location = createVector(
			middlePointX,
			middlePointY);
		this.spawnLocation = createVector(
			spawnX,
			spawnY);

		this.points[0] = this.location;
	}

	drawLocation(ctx)
	{
		if (!this.agentAlive)
		{
			return;
		}

		//ctx.fill(this.visualProperties.color);
		ctx.stroke(this.visualProperties.color);
		ctx.ellipse(this.location.x, this.location.y, this.visualProperties.width, this.visualProperties.width);
	}

	updateCycle()
	{
		if (!this.agentAlive)
		{
			return;
		}

		let newX = this.points[this.points.length - 1].x
			+ (cos(this.angle) * this.moveSpeed);
        let newY = this.points[this.points.length - 1].y
            + (sin(this.angle) * this.moveSpeed);

        this.location = createVector(
            newX,
            newY
        );
		
		let newWidth = 1/1024*window.frequencyGlobal * 100;
		this.visualProperties.width = newWidth;

        this.points.push(this.location);
        this.livecycles = this.livecycles - 1;
        if (this.livecycles < 0)
        {
            this.agentAlive = false;
        }
	}
}