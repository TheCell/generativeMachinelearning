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

        middlePointX = middlePointX - 250 + Math.floor(500 * Math.random());
        middlePointY = middlePointY - 250 + Math.floor(500 * Math.random());

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
        
        ctx.push();
            ctx.translate(this.location.x, this.location.y);
            ctx.rotate(PI / 2 * Math.random());
            ctx.rect(- this.visualProperties.width / 2, - this.visualProperties.width / 2, this.visualProperties.width, this.visualProperties.width);
            //ctx.rect(this.location.x, this.location.y, this.visualProperties.width, this.visualProperties.width);
        ctx.pop();
		
	}

	updateCycle()
	{
		if (!this.agentAlive)
		{
			return;
        }
        
        let newX = this.points[this.points.length - 1].x
            + ((sin(this.angle) / 2) * this.moveSpeed);
        let newY = this.points[this.points.length - 1].y
            + ((cos(this.angle) / 2 ) * this.moveSpeed);

        this.location = createVector(
            newX,
            newY
        );
        
        // update properties to draw
        this.angle = this.angle + (0.025 * Math.random());
        
        if (this.isShrinking)
        {
            this.visualProperties.width = this.visualProperties.width - 1;

            if (this.visualProperties.width < 5)
            {
                this.isShrinking = false;
            }
        }
        else
        {
            this.visualProperties.width = this.visualProperties.width + 1;

            if (this.visualProperties.width > 20)
            {
                this.isShrinking = true;
            }
        }

        this.points.push(this.location);
        this.livecycles = this.livecycles - 1;

        if (this.livecycles < 8)
        {
            this.agentAlive = false;
        }
	}
}