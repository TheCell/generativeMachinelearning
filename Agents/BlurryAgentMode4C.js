"use strict";

class BlurryAgentMode4C
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
        this.livecycles = 30;
        this.isShrinking = true;


		// set middle point
		this.location = createVector(
			middlePointX,
			middlePointY);
		this.spawnLocation = createVector(
			spawnX,
            spawnY);

        this.points[0] = this.location;

        this.visualProperties.width = 10
	}

	drawLocation(ctx)
	{
		if (!this.agentAlive)
		{
			return;
        }
        
        ctx.noStroke();

        for(let i = 10; i > 1.0; i = i - 0.5)
        {
            ctx.fill(this.visualProperties.color.slice(0, 7) + "02");
            ctx.ellipse(this.location.x, this.location.y, this.visualProperties.width * i, this.visualProperties.width * i);
        }

		ctx.fill(this.visualProperties.color);
        ctx.ellipse(this.location.x, this.location.y, this.visualProperties.width, this.visualProperties.width);
	}

	updateCycle()
	{
		if (!this.agentAlive)
		{
			return;
        }
        
        this.points.push(this.location);
        this.livecycles = this.livecycles - 1;

        if (this.livecycles < 0)
        {
            this.agentAlive = false;
        }
	}
}