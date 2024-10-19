import { InputHandler } from "./inputhandler";
import { Vector } from "./vector";

export class Cloud {
	pos: Vector;
	width = 80;
	height = 80;
	constructor(pos: Vector) {
		this.pos = pos;
	}
	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillRect(this.pos.x, this.pos.y, 80, 80);
	}
	update(e: InputHandler): void {}
}
