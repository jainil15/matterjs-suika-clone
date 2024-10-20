import { Bodies, Body, Svg, Vector } from "matter-js";

export class Ball {
	body: Body;
	radius: number;
	pos: Vector;
	constructor(pos: Vector, radius: number, showBall?: boolean) {
		this.pos = pos;
		this.radius = radius;

		this.body = Bodies.circle(
			pos.x,
			pos.y,
			this.radius,
			{
				mass: 0,
				restitution: 0.24,
				isStatic: showBall,
			},
			1000,
		);
		if (showBall) {
			this.body.collisionFilter = {
				group: -1,
				category: 2,
				mask: 0,
			};
		}
	}
}
export const FRUIT_PROPS = {
	cherry: { radius: 10, points: 1, sprite: "cherry.png", color: "#FF4C4C" },
	strawberry: {
		radius: 15,
		points: 2,
		sprite: "strawberry.png",
		color: "#FF5A77",
	},
	grapes: { radius: 20, points: 3, sprite: "grapes.png", color: "#6A0DAD" },
	dekopon: { radius: 25, points: 4, sprite: "dekopon.png", color: "#FFA500" },
	persimmon: {
		radius: 30,
		points: 5,
		sprite: "persimmon.png",
		color: "#FF6347",
	},
	apple: { radius: 35, points: 6, sprite: "apple.png", color: "#66CC33" },
	nashi: { radius: 40, points: 7, sprite: "nashi.png", color: "#FFE5B4" },
	peach: { radius: 45, points: 8, sprite: "peach.png", color: "#5FDAB9" },
	pineapple: {
		radius: 50,
		points: 9,
		sprite: "pineapple.png",
		color: "#9FD700",
	},
	melon: { radius: 55, points: 10, sprite: "melon.png", color: "#98FB98" },
	titular: { radius: 60, points: 11, sprite: "titular.png", color: "#4682B4" },
};
export type FruitName = keyof typeof FRUIT;
export const FRUIT = {
	cherry: 20,
	strawberry: 22,
	grapes: 25,
	dekopon: 30,
	persimmon: 37,
	apple: 48,
	nashi: 58,
	peach: 65,
	pineapple: 84,
	melon: 92,
	titular: 108,
};
export const FRUIT_COLOR = {
	cherry: "#FF4C4C", // Red
	strawberry: "#FF5A77", // Pinkish Red
	grapes: "#6A0DAD", // Purple
	dekopon: "#FFA500", // Orange
	persimmon: "#FF6347", // Tomato Red
	apple: "#66CC33", // Green
	nashi: "#FFE5B4", // Light Beige
	peach: "#FFDAB9", // Peach
	pineapple: "#FFD700", // Gold
	melon: "#98FB98", // Pale Green
	titular: "#4682B4", // Steel Blue
};
// the cherry, the strawberry, the grapes, the dekopon, the persimmon, the apple, the nashi pear, the peach, the pineapple, the melon, and the titular watermelon
export class Fruit extends Ball {
	name: FruitName;
	points: number;
	constructor(pos: Vector, name: FruitName, showBall?: boolean) {
		super(pos, FRUIT[name], showBall);
		const prop = FRUIT_PROPS[name];
		this.name = name;
		this.body.render.fillStyle = prop.color;
		this.points = prop.points;
		if (this.body.render.sprite) {
			this.body.render.sprite.xScale = 0.6;
			this.body.render.sprite.yScale = 0.6;
			this.body.render.sprite.texture = `/assets/${this.name}.png`;
		}
	}
	nextFruitName(): FruitName {
		const nextFruitName =
			Object.keys(FRUIT)[Object.keys(FRUIT).indexOf(this.name) + 1];
		return nextFruitName as FruitName;
	}
}
