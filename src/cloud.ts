import { Bodies, Body } from "matter-js";
import { InputHandler } from "./inputhandler";
import { Vector } from "./vector";

export class Cloud {
	pos: Vector;
	width = 100;
	height = 30;
	body: Body;
	constructor(pos: Vector) {
		this.pos = pos;
		this.body = Bodies.rectangle(pos.x, pos.y, this.width, this.height, {
			collisionFilter: {
				mask: 0,
			},
			render: {
				sprite: {
					texture: `/assets/player.png`,
					xScale: 0.5,
					yScale: 0.5,
				},
			},
			isStatic: true,
		});
	}
}
