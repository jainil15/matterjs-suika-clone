import { Bodies, Body, Vector } from "matter-js";

export class Ball {
	body: Body;
	radius: number;
	pos: Vector;
	constructor(pos: Vector, radius: number) {
		this.pos = pos;
		this.radius = radius;
		this.body = Bodies.circle(pos.x, pos.y, this.radius);
	}
}
