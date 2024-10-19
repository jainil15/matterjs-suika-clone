import { Vector } from "./vector";
export class Ball {
	pos: Vector;
	radius: number;
	speed: Vector;
	speedVal = 4;
	angle = 120;
	bounce = 0.6;
	gravity = 0.05;
	frictionMul = 0.005;
	mass: number;
	color = "black";
	constructor(pos: Vector, radius: number) {
		this.pos = pos;
		this.speed = new Vector(1, 0);
		this.radius = radius;
		this.mass = radius;
	}
	update(
		balls: Ball[],
		index: number,
		left: number,
		right: number,
		bottom: number,
	): void {
		if (this.speed.x < 0.0001) {
			this.speed.x = 0;
		}
		this.hitBalls(balls, index);
		this.speed.y += this.gravity;
		this.speed.x -= this.speed.x * this.frictionMul;
		this.pos.add(this.speed);
		this.hitBoundry(left, right, bottom);
	}
	hitBalls(balls: Ball[], index: number): void {
		for (const ball of balls.slice(index + 1)) {
			let d = Vector.zero();
			d.x = ball.pos.x - this.pos.x;
			d.y = ball.pos.y - this.pos.y;
			let distance = d.distance();
			if (distance < ball.radius + this.radius) {
				if (ball.radius == this.radius) {
					this.radius *= 2;
					balls.splice(balls.indexOf(this) - 1, 1);
				}
				const normalized = d.normalized();
				const rSpeed = this.speed.clone();
				const correction = normalized.clone();
				correction.mulConstanct(0.02);
				this.pos.sub(correction);
				ball.pos.add(correction);

				rSpeed.sub(ball.speed);
				const speed = normalized.x * rSpeed.x + normalized.y * rSpeed.y;
				console.log(speed);
				console.log(ball.speed, this.speed);
				if (speed < 0) {
					continue;
				}
				const impulse = (2 * speed) / (ball.mass + this.mass);
				this.speed.x -= impulse * ball.mass * normalized.x;
				this.speed.y -= impulse * ball.mass * normalized.y;
				ball.speed.x += impulse * this.mass * normalized.x;
				ball.speed.y += impulse * this.mass * normalized.y;
				// elasticity ?
				this.speed.y = this.speed.y * 0.05;
				ball.speed.y = ball.speed.y * 0.05;
				const displacement = ball.radius + this.radius - distance;
				if (ball.pos.x > this.pos.x) {
					ball.pos.x += displacement;
					this.pos.x -= displacement;
				} else {
					this.pos.x += displacement;
					ball.pos.x -= displacement;
				}
				if (ball.pos.y > this.pos.y) {
					ball.pos.y += displacement;
					this.pos.y -= displacement;
				} else {
					this.pos.y += displacement;
					ball.pos.y -= displacement;
				}
			}
		}
	}
	hitBoundry(left: number, right: number, bottom: number): void {
		if (this.pos.y > bottom - this.radius) {
			this.pos.y = bottom - this.radius;
			this.speed.y = -(this.speed.y * this.bounce);
			// this.speed.x = this.speed.x * (this.frictionMul * 1.4);
		}
		if (this.pos.x > right - this.radius) {
			this.pos.x = right - this.radius;
			this.speed.x = -this.speed.x * this.frictionMul;
		}
		if (this.pos.x < left + this.radius) {
			this.pos.x = left + this.radius;
			this.speed.x = -this.speed.x * this.frictionMul;
		}
	}
	draw(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 360);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
	moveTo(toPos: Vector) {
		this.pos.x = toPos.x;
		this.pos.y = toPos.y;
	}
}
