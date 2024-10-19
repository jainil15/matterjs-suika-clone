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
	constructor() {
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
		this.mouse.element.addEventListener("pointermove", (e: PointerEvent) =>
			this.handlePointerMove(e),
		);
		this.mouse.element.addEventListener("pointerup", (e: PointerEvent) =>
			this.handlePointerClick(e),
		);
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
		for (let i = 0; i < this.balls.length; i++) {
			const bodies = this.balls.map((ball) => ball.body);
			const collisions = Query.collides(this.balls[i].body, bodies);
			collisions.forEach((ball, j) => {
				if (this.balls[j].radius === this.balls[i].radius) {
					Composite.remove(this.engine.world, this.balls[j].body);
					const newBall = new Ball(this.balls[i].pos, this.balls[j].radius * 2);
					// Composite.add(this.engine.world, newBall.body);
					Composite.remove(this.engine.world, this.balls[i].body);
					return;
				}
			});
		}
	}
	runGameLoop(): void {
		const runner = Runner.create();
		Runner.run(runner, this.engine);
		const gameLoop = () => {
			this.update();
			requestAnimationFrame(gameLoop);
		};
		requestAnimationFrame(gameLoop);
	}
	handlePointerClick(e: PointerEvent): void {
		const cloudPos = new Vector(
			this.cloud.body.position.x,
			this.cloud.body.position.y + this.cloud.height / 2,
		);
		const ball = new Ball(cloudPos, 20);
		this.balls.push(new Ball(cloudPos, 20));
		Composite.add(this.engine.world, ball.body);
	}
	update(): void {
		Engine.update(this.engine);
		this.handleCollision();
	}
	draw(): void {
		const runner = Runner.create();
		Runner.run(runner, this.engine);
		const gameLoop = () => {
			this.update();
			requestAnimationFrame(gameLoop);
		};
		requestAnimationFrame(gameLoop);
		Render.run(this.render);
		Runner.run(runner, this.engine);
	}
}
