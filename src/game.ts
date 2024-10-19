import { Ball } from "./ball";
import { Box } from "./box";
import { Cloud } from "./cloud";
import { InputHandler } from "./inputhandler";
import { Vector } from "./vector";

export class Game {
	balls: Ball[];
	cloud: Cloud;
	box: Box;
	input: InputHandler;
	canvas: HTMLCanvasElement;
	constructor(canvas: HTMLCanvasElement) {
		this.balls = [];
		this.input = new InputHandler(canvas);
		this.box = new Box(400, 400);
		this.cloud = new Cloud(
			new Vector(
				this.box.pos.x + this.box.width / 2 - 40,
				this.box.pos.y - this.box.height - 90,
			),
		);
		this.input.addPointerMoveHandler((e: PointerEvent) =>
			this.handlePointerMove(e),
		);
		this.input.addPointerClickHandler((e: PointerEvent) =>
			this.handlePointerClickHandler(e),
		);
		this.canvas = canvas;
	}
	handlePointerMove(e: PointerEvent): void {
		const rect = this.canvas.getBoundingClientRect();
		const posX = e.clientX - rect.x - this.cloud.width / 2;
		if (
			posX > this.box.pos.x &&
			posX < this.box.pos.x + this.box.width - this.cloud.width
		) {
			this.cloud.pos.x = posX;
		} else if (posX > this.box.pos.x + this.box.width - this.cloud.width) {
			this.cloud.pos.x = this.box.pos.x + this.box.width - this.cloud.width;
		} else if (posX < this.box.pos.x) {
			this.cloud.pos.x = this.box.pos.x;
		}
	}
	handlePointerClickHandler(e: PointerEvent): void {
		const cloudPos = new Vector(
			this.cloud.pos.x + this.cloud.width / 2,
			this.cloud.pos.y + this.cloud.height,
		);
		this.balls.push(new Ball(cloudPos, 20));
	}
	update(): void {
		for (let i = 0; i < this.balls.length; i++) {
			this.balls[i].update(
				this.balls,
				i,
				this.box.pos.x,
				this.box.pos.x + this.box.width,
				this.box.pos.y,
			);
		}
	}
	draw(ctx: CanvasRenderingContext2D): void {
		this.cloud.draw(ctx);
		this.box.draw(ctx);
		for (const ball of this.balls) {
			ball.draw(ctx);
		}
	}
}
