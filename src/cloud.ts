import { Bodies, Body } from "matter-js";
import { InputHandler } from "./inputhandler";
import { Vector } from "./vector";

export class Cloud {
	pos: Vector;
	width = 100;
	height = 20;
	body: Body;
	constructor(pos: Vector) {
		this.pos = pos;
		this.body = Bodies.rectangle(pos.x, pos.y, this.width, this.height, {
			collisionFilter: {
				mask: 0,
			},
			isStatic: true,
		});
	}
}
