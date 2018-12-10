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
        this.points = [];
        this.livecycles = 200;

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

		ctx.fill(this.visualProperties.color);
		ctx.noStroke();
		
		ctx.ellipse(this.location.x, this.location.y, window.frequencyGlobal / 16, window.frequencyGlobal / 16);
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

        this.points.push(this.location);
        this.livecycles = this.livecycles - 1;
        if (this.livecycles < 0)
        {
            this.agentAlive = false;
        }
	}
}