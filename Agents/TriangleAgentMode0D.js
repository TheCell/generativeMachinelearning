"use strict";

class TriangleAgentMode0D
{
	constructor(
		middlePointX,
		middlePointY,
		moveSpeed = moveSpeed,
		visualProperties,
        angle = random(0, Math.PI * 2),
        angleLine = random(0, Math.PI * 2),
		spawnX = middlePointX,
		spawnY = middlePointY)
	{
		// set properties
		this.moveSpeed = moveSpeed;
		this.agentAlive = true;
        this.angle = angle;
        this.angleLine = angleLine;
        this.visualProperties = visualProperties;
        this.points = [];
        this.pointsLine = [];
        this.livecycles = 200;
        //this.isShrinking = true;

        middlePointX = middlePointX - 500 + Math.floor(1000 * Math.random());
        middlePointY = middlePointY - 500 + Math.floor(1000 * Math.random());

        // set middle point
		this.location = createVector(
			middlePointX,
			middlePointY);
		this.spawnLocation = createVector(
			spawnX,
            spawnY);
        this.locationLine = createVector(
                middlePointX,
                middlePointY);
        this.spawnLocationLine = createVector(
                spawnX,
                spawnY);

        this.points[0] = this.location;
        this.pointsLine[0] = this.locationLine;

        this.visualProperties.width = 20
	}

	drawLocation(ctx)
	{
		if (!this.agentAlive)
		{
			return;
		}

		ctx.fill(this.visualProperties.color);
		
        
        ctx.push();
            ctx.noStroke();
            ctx.triangle(this.location.x, this.location.y, this.location.x + 10, this.location.y - 17, this.location.x + 20, this.location.y);
        ctx.pop();

        ctx.push();
            ctx.strokeWeight(1);
            ctx.stroke(0,0,0,20);
            ctx.line(this.locationLine.x-20, this.locationLine.y-40, this.locationLine.x + 20, this.location.y + 20);
            
        ctx.pop();
		console.log(this.visualProperties.color);
	}

	updateCycle()
	{
		if (!this.agentAlive)
		{
			return;
        }
        
        let newX = this.points[this.points.length - 1].x
            + ((cos(this.angle) / 2) * this.moveSpeed*2);
        let newY = this.points[this.points.length - 1].y
            + ((sin(this.angle) / 2 ) * this.moveSpeed/1.5);

        let newLineX = this.pointsLine[this.pointsLine.length -1].x
            + ((cos(this.angleLine) + 2) * this.moveSpeed);
        let newLineY = this.pointsLine[this.pointsLine.length -1].y
            + ((sin(this.angleLine)) * this.moveSpeed);

        this.location = createVector(
            newX,
            newY
        );
        this.locationLine = createVector(
            newLineX,
            newLineY
        );
        
        // update properties to draw
        this.angle = this.angle + (Math.random() / 10);
        this.angleLine = this.angleLine + 90;
        
 

        this.points.push(this.location);
        this.pointsLine.push(this.locationLine);
        this.livecycles = this.livecycles - 1;

        if (this.livecycles < 5)
        {
            this.agentAlive = false;
        }
	}
}