"use strict";

class SquareAgentMode0D
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
        this.isShrinking = true;

		// set middle point
		this.location = createVector(
			middlePointX,
			middlePointY);
		this.spawnLocation = createVector(
			spawnX,
            spawnY);

        this.points[0] = this.location;

        this.visualProperties.width = 20
	}

	drawLocation(ctx)
	{
		if (!this.agentAlive)
		{
			return;
		}

		ctx.fill(this.visualProperties.color);
		ctx.noStroke();
		
		ctx.rect(this.location.x, this.location.y, this.visualProperties.width, this.visualProperties.width);
	}

	updateCycle()
	{
		if (!this.agentAlive)
		{
			return;
        }
        
        let newX = this.points[this.points.length - 1].x
			+ (sin(this.angle) * this.moveSpeed);
        let newY = this.points[this.points.length - 1].y
            + (cos(this.angle) * this.moveSpeed);

        this.location = createVector(
            newX,
            newY
        );
        
        // update properties to draw
        this.angle = this.angle + (0.03 * Math.random());
        
        if (this.isShrinking)
        {
            this.visualProperties.width = this.visualProperties.width - 1;

            if (this.visualProperties.width < 1)
            {
                this.isShrinking = false;
            }
        }
        else
        {
            this.visualProperties.width = this.visualProperties.width + 1;

            if (this.visualProperties.width > 10)
            {
                this.isShrinking = true;
            }
        }

        this.points.push(this.location);
        this.livecycles = this.livecycles - 1;

        if (this.livecycles < 0)
        {
            this.agentAlive = false;
        }
	}
}