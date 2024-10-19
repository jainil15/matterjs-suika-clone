import {
	Bodies,
	Body,
	Collision,
	Composite,
	Engine,
	Mouse,
	Query,
	Render,
	Runner,
	World,
} from "matter-js";
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
	engine: Engine;
	render: Render;
	mouse: Mouse;
	gameOver: boolean;
	constructor() {
		this.gameOver = false;
		this.balls = [];
		this.input = new InputHandler();
		this.box = new Box(400, 400);
		this.cloud = new Cloud(
			new Vector(
				this.box.pos.x + this.box.width / 2 - 40,
				this.box.pos.y - this.box.height - 90,
			),
		);
		this.engine = Engine.create();
		this.render = Render.create({
			engine: this.engine,
			element: document.body,
		});
		Composite.add(this.engine.world, this.box.body);
		Composite.add(this.engine.world, this.cloud.body);
		this.mouse = Mouse.create(this.render.canvas);
	}
	handlePointerMove(e: PointerEvent): void {
		const posX = e.clientX - this.cloud.width / 2;
		if (
			posX > this.box.pos.x &&
			posX < this.box.pos.x + this.box.width - this.cloud.width
		) {
			Body.setPosition(this.cloud.body, {
				x: e.clientX,
				y: this.cloud.body.position.y,
			});
		} else if (posX > this.box.pos.x + this.box.width - this.cloud.width) {
			Body.setPosition(this.cloud.body, {
				x: this.box.pos.x + this.box.width - this.cloud.width / 2,
				y: this.cloud.body.position.y,
			});
		} else if (posX < this.box.pos.x) {
			this.cloud.pos.x = this.box.pos.x;
			Body.setPosition(this.cloud.body, {
				x: this.box.pos.x + this.cloud.width / 2,
				y: this.cloud.body.position.y,
			});
		}
	}
	handleCollision(): void {
		this.handleCloudCollision();
		for (let i = 0; i < this.balls.length; i++) {
			for (let j = i + 1; j < this.balls.length; j++) {
				const collision = Collision.collides(
					this.balls[i].body,
					this.balls[j].body,
				);
				if (collision) {
					if (this.balls[i].radius === this.balls[j].radius) {
						const newBall = new Ball(
							this.balls[i].body.position,
							this.balls[i].radius * 2,
						);
						Composite.add(this.engine.world, newBall.body);
						Composite.remove(this.engine.world, this.balls[j].body);
						Composite.remove(this.engine.world, this.balls[i].body);
						this.balls.splice(j, 1);
						this.balls.splice(i, 1);
						this.balls.push(newBall);
						break;
					}
				}
			}
		}
	}
	handleCloudCollision(): void {
		for (let i = 0; i < this.balls.length; i++) {
			const collision = Collision.collides(this.balls[i].body, this.cloud.body);
			if (collision) {
				console.log("Game over");
				this.gameOver = true;
			}
		}
	}
	handlePointerClick(e: PointerEvent): void {
		const cloudPos = new Vector(
			this.cloud.body.position.x,
			this.cloud.body.position.y + this.cloud.height - 20,
		);
		const ball = new Ball(cloudPos, 20);
		this.balls.push(ball);
		Composite.add(this.engine.world, ball.body);
	}
	update(): void {
		Engine.update(this.engine);
		this.handleCollision();
	}
	endGame(): void {
		this.mouse.element.removeEventListener(
			"pointermove",
			this.handlePointerMove,
		);
		this.mouse.element.removeEventListener(
			"pointerdown",
			this.handlePointerClick,
		);
	}
	draw(): void {
		this.mouse.element.addEventListener("pointermove", (e: PointerEvent) =>
			this.handlePointerMove(e),
		);
		this.mouse.element.addEventListener("pointerdown", (e: PointerEvent) =>
			this.handlePointerClick(e),
		);
		const runner = Runner.create();
		// Runner.run(runner, this.engine);
		const gameLoop = () => {
			if (!this.gameOver) {
				this.update();
				requestAnimationFrame(gameLoop);
			} else {
				this.endGame();
				Runner.stop(runner);
				Render.stop(this.render);
			}
		};
		requestAnimationFrame(gameLoop);
		Render.run(this.render);
		Runner.run(runner, this.engine);
	}
}
