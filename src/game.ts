import {
	Bodies,
	Body,
	Collision,
	Composite,
	Engine,
	Mouse,
	Render,
	Runner,
} from "matter-js";
import { Ball, Fruit, FRUIT, type FruitName } from "./ball";
import { Box } from "./box";
import { Cloud } from "./cloud";
import { InputHandler } from "./inputhandler";
import { Vector } from "./vector";

export class Game {
	fruits: Fruit[];
	cloud: Cloud;
	box: Box;
	input: InputHandler;
	engine: Engine;
	render: Render;
	mouse: Mouse;
	currentFruit: Fruit;
	gameOver: boolean;
	canClick: boolean;
	score: number;
	constructor() {
		this.canClick = true;
		this.score = 0;
		this.showScore();
		this.gameOver = false;
		this.fruits = [];

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
			options: {
				wireframes: false,
			},
		});
		Composite.add(this.engine.world, this.box.body);
		Composite.add(this.engine.world, this.cloud.body);
		this.mouse = Mouse.create(this.render.canvas);

		this.mouse.element.addEventListener("pointermove", (e: PointerEvent) =>
			this.handlePointerMove(e),
		);
		this.mouse.element.addEventListener("pointerdown", (e: PointerEvent) =>
			this.handlePointerClick(e),
		);
		this.currentFruit = this.showBall();
	}
	showScore(): void {
		const score = document.getElementById("score");
		if (score) {
			if (score.innerHTML !== this.score.toString())
				score.innerHTML = this.score.toString();
		} else {
			console.log("");
		}
	}
	showBall(): Fruit {
		if (this.currentFruit) {
			Composite.remove(this.engine.world, this.currentFruit.body);
		}
		const fruitName = Object.keys(FRUIT)[
			Math.floor(Math.random() * 6)
		] as FruitName;
		const newFruit = new Fruit(
			new Vector(this.cloud.body.position.x, this.cloud.body.position.y),
			fruitName,
			true,
		);
		newFruit.body.position = new Vector(
			this.cloud.body.position.x,
			this.cloud.body.position.y + this.cloud.height / 2,
		);
		Composite.add(this.engine.world, newFruit.body);
		return newFruit;
	}
	handlePointerMove(e: PointerEvent): void {
		const rect = this.render.canvas.getBoundingClientRect();
		const posX = e.clientX - rect.left - this.cloud.width / 2;
		if (
			posX > this.box.pos.x &&
			posX < this.box.pos.x + this.box.width - this.cloud.width
		) {
			Body.setPosition(this.cloud.body, {
				x: posX + this.cloud.width / 2,
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
		this.currentFruit.body.position = new Vector(
			this.cloud.body.position.x,
			this.cloud.body.position.y + this.cloud.height / 2,
		);
	}
	handleCollision(): void {
		for (let i = 0; i < this.fruits.length; i++) {
			for (let j = i + 1; j < this.fruits.length; j++) {
				const collision = Collision.collides(
					this.fruits[i].body,
					this.fruits[j].body,
				);
				if (collision) {
					if (
						this.fruits[i].name === this.fruits[j].name &&
						this.fruits[i].name !== "titular"
					) {
						if (this.fruits[i].nextFruitName()) {
							const newBall = new Fruit(
								this.fruits[i].body.position,
								this.fruits[i].nextFruitName(),
							);
							this.score += this.fruits[i].points * 2;
							Composite.add(this.engine.world, newBall.body);
							Composite.remove(this.engine.world, this.fruits[j].body);
							Composite.remove(this.engine.world, this.fruits[i].body);
							this.fruits.splice(j, 1);
							this.fruits.splice(i, 1);
							this.fruits.push(newBall);
							this.showScore();
							break;
						}
					}
				}
			}
		}
		this.handleCloudCollision();
	}
	handleCloudCollision(): void {
		for (let i = 0; i < this.fruits.length; i++) {
			const collision = Collision.collides(
				this.fruits[i].body,
				this.cloud.body,
			);
			if (collision) {
				console.log("Game over");
				this.gameOver = true;
			}
		}
	}
	handlePointerClick(e: PointerEvent): void {
		if (this.canClick) {
			this.canClick = false;
			setTimeout(() => {
				this.currentFruit = this.showBall();
				this.canClick = true;
			}, 500);
			const cloudPos = new Vector(
				this.cloud.body.position.x,
				this.cloud.body.position.y +
					this.cloud.width / 2 +
					this.currentFruit.radius +
					2,
			);
			Composite.remove(this.engine.world, this.currentFruit.body);
			const fruit = new Fruit(cloudPos, this.currentFruit.name);
			this.fruits.push(fruit);
			Composite.add(this.engine.world, fruit.body);
		}
	}
	update(): void {
		console.log(this.fruits.length);
		Engine.update(this.engine);
		this.handleCollision();

		const top = this.box.height + this.box.pos.y;

		///
		for (const fruit of this.fruits) {
			if (fruit.body.position.y < top && fruit.body.velocity.y <= 0) {
				console.log("Game over");
				this.gameOver = true;
				break;
			}
		}
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
		const runner = Runner.create();
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
