"use strict";

class PerlinAgentMode0C
{
	constructor(
		middlePointX,
		middlePointY,
		moveSpeed = moveSpeed,
        visualProperties,
        direction,
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
        if (typeof(direction) == "undefined")
        {
            let directs = {"up": "up", "right": "right", "down": "down", "left": "left"};
            let keys = Object.keys(directs)
            direction = directs[keys[ keys.length * Math.random() << 0]];
        }
        this.direction = direction;

        this.noiseSeed = Math.floor(Math.random() * 10000);
        this.mapReduction = 100;

        middlePointX = middlePointX - 50 + Math.floor(100 * Math.random());
        middlePointY = middlePointY - 50 + Math.floor(100 * Math.random());

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
		
		ctx.ellipse(this.location.x, this.location.y, this.visualProperties.width, this.visualProperties.width);
	}

	updateCycle()
	{
		if (!this.agentAlive)
		{
			return;
        }

        let startX = this.points[this.points.length - 1].x;
        let startY = this.points[this.points.length - 1].y;

        let newX;
		let newY;
		
		let xMultiplicator = 1;
		let yMultiplicator = 1;

        if (this.direction == "up")
        {
			yMultiplicator = -1;
        }
        else if (this.direction == "right")
        {
			xMultiplicator = -1;
			yMultiplicator = -1;
        }
        else if (this.direction == "down")
        {
			xMultiplicator = -1;
        }
        else if (this.direction == "left")
        {
		}
		
		newX = startX
			+ xMultiplicator * (cos(
				map(
					noise(
						(startX + this.noiseSeed) / this.mapReduction,
						(startY + this.noiseSeed) / this.mapReduction),
					0,
					1,
					0,
					Math.PI * 2))
				* this.moveSpeed);
		newY = startY
			+ yMultiplicator * (sin(
				map(
					noise(
						(startX + this.noiseSeed) / this.mapReduction,
						(startY + this.noiseSeed) / this.mapReduction),
					0,
					1,
					0,
					Math.PI * 2))
				* this.moveSpeed);
        
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