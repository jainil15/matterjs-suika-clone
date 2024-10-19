import { Body, Vector as MVector, Bodies, Composite } from "matter-js";
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "./constant";
import { Vector } from "./vector";

export class Box {
	width: number;
	height: number;
	pos: Vector;
	body: Body | Array<Body>;
	wallThickness = 20;
	constructor(width: number, height: number) {
		this.height = height;
		this.width = width;
		// 2x + height = DISPLAY_HEIGHT
		this.pos = new Vector(
			(DISPLAY_WIDTH - this.width) / 2,
			(DISPLAY_HEIGHT + this.height) / 2,
		);

		// Create static bodies for the sides of the box (without top)
		// ctx.moveTo(this.pos.x, this.pos.y);
		// ctx.lineTo(this.pos.x, this.pos.y - this.height);
		//
		// ctx.moveTo(this.pos.x, this.pos.y);
		// ctx.lineTo(this.pos.x, this.pos.y - this.height);
		//
		// ctx.moveTo(this.pos.x, this.pos.y);
		// ctx.lineTo(this.pos.x + this.width, this.pos.y);

		const leftWall = Bodies.rectangle(
			this.pos.x + this.width,
			this.pos.y - this.height / 2,
			this.wallThickness,
			this.height,
			{
				isStatic: true,
			},
		);
		const rightWall = Bodies.rectangle(
			this.pos.x,
			this.pos.y - this.height / 2,
			this.wallThickness,
			this.height,
			{
				isStatic: true,
			},
		);
		const bottomWall = Bodies.rectangle(
			this.pos.x + this.width / 2,
			this.pos.y,
			this.width,
			this.wallThickness,
			{
				isStatic: true,
			},
		);
		this.body = [rightWall, bottomWall, leftWall];
	}
	draw(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath();
		// console.log(this.pos);
		ctx.moveTo(this.pos.x, this.pos.y);
		ctx.lineTo(this.pos.x, this.pos.y - this.height);

		ctx.moveTo(this.pos.x, this.pos.y);
		ctx.lineTo(this.pos.x + this.width, this.pos.y);

		ctx.lineTo(this.pos.x + this.width, this.pos.y - this.height);

		ctx.lineWidth = 3;
		ctx.stroke();
	}
}
