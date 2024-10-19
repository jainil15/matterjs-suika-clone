import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "./constant";
import { Vector } from "./vector";

export class Box {
	width: number;
	height: number;
	pos: Vector;
	constructor(width: number, height: number) {
		this.height = height;
		this.width = width;
		// 2x + height = DISPLAY_HEIGHT
		this.pos = new Vector(
			(DISPLAY_WIDTH - this.width) / 2,
			(DISPLAY_HEIGHT + this.height) / 2,
		);
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
