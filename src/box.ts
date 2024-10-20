import { Body, Bodies } from "matter-js";
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "./constant";
import { Vector } from "./vector";

export class Box {
	width: number;
	height: number;
	pos: Vector;
	body: Body | Array<Body>;
	top: number;
	wallThickness = 20;
	backWallThickness = 5;
	constructor(width: number, height: number) {
		this.height = height;
		this.width = width;
		// 2x + height = DISPLAY_HEIGHT
		this.pos = new Vector(
			(DISPLAY_WIDTH - this.width) / 2,
			(DISPLAY_HEIGHT + this.height) / 2,
		);
		const shift = 50;
		this.top = this.pos.y - this.height;
		const bgColor = "#aaaaaa";
		const wallBackColor = "#333333";
		const leftWall = Bodies.rectangle(
			this.pos.x + this.width,
			this.pos.y - this.height / 2,
			this.wallThickness,
			this.height,
			{
				isStatic: true,
				render: {
					fillStyle: bgColor,
				},
			},
		);
		const leftWallBack = Bodies.rectangle(
			this.pos.x + this.width - shift,
			this.pos.y - this.height / 2 - shift,
			this.wallThickness,
			this.height,
			{
				isStatic: true,
				collisionFilter: {
					mask: 0,
				},
				render: {
					fillStyle: wallBackColor,
				},
			},
		);
		const rightWall = Bodies.rectangle(
			this.pos.x,
			this.pos.y - this.height / 2,
			this.wallThickness,
			this.height,
			{
				isStatic: true,
				render: {
					fillStyle: bgColor,
				},
			},
		);
		const rightWallBack = Bodies.rectangle(
			this.pos.x + shift,
			this.pos.y - this.height / 2 - shift,
			this.wallThickness,
			this.height,
			{
				isStatic: true,
				collisionFilter: {
					mask: 0,
				},
				render: {
					fillStyle: wallBackColor,
				},
			},
		);
		const bottomWall = Bodies.rectangle(
			this.pos.x + this.width / 2,
			this.pos.y,
			this.width + this.wallThickness,
			this.wallThickness,
			{
				isStatic: true,
				render: {
					fillStyle: bgColor,
				},
			},
		);

		const topWall = Bodies.rectangle(
			this.pos.x + this.width / 2,
			this.top,
			this.width + this.wallThickness,
			this.wallThickness,
			{
				collisionFilter: {
					mask: 0,
				},
				isStatic: true,
				render: {
					fillStyle: bgColor,
				},
			},
		);

		const bottomWallBack = Bodies.rectangle(
			this.pos.x + this.width / 2,
			this.pos.y - shift,
			this.width + this.wallThickness - shift * 2,
			this.wallThickness,
			{
				collisionFilter: {
					mask: 0,
				},
				isStatic: true,
				render: {
					fillStyle: wallBackColor,
				},
			},
		);
		const topWallBack = Bodies.rectangle(
			this.pos.x + this.width / 2,
			this.top - shift,
			this.width + this.wallThickness - shift * 2,
			this.wallThickness,
			{
				collisionFilter: {
					mask: 0,
				},
				isStatic: true,
				render: {
					fillStyle: wallBackColor,
				},
			},
		);
		const topRightEdge = Bodies.trapezoid(
			this.pos.x + this.width - 21,
			this.top - shift + 24,
			this.wallThickness,
			shift * 1.5,
			0.1,
			{
				angle: Math.PI + (3 * Math.PI) / 4,
				collisionFilter: {
					mask: 0,
				},
				isStatic: true,
				render: {
					fillStyle: wallBackColor,
				},
			},
		);
		const topLeftEdge = Bodies.trapezoid(
			this.pos.x + 21,
			this.top - shift + 24,
			this.wallThickness,
			shift * 1.5,
			0.1,
			{
				angle: (1 * Math.PI) / 4,
				collisionFilter: {
					mask: 0,
				},
				isStatic: true,
				render: {
					fillStyle: wallBackColor,
				},
			},
		);
		const bottomLeftEdge = Bodies.trapezoid(
			this.pos.x + 24,
			this.top + this.height - shift + 24,
			this.wallThickness,
			shift * 1.5,
			0.1,
			{
				angle: (1 * Math.PI) / 4,
				collisionFilter: {
					mask: 0,
				},
				isStatic: true,
				render: {
					fillStyle: wallBackColor,
				},
			},
		);
		const bottomRightEdge = Bodies.trapezoid(
			this.pos.x + this.width - 24,
			this.top + this.height - shift + 24,
			this.wallThickness,
			shift * 1.5,
			0.1,
			{
				angle: Math.PI + (3 * Math.PI) / 4,
				collisionFilter: {
					mask: 0,
				},
				isStatic: true,
				render: {
					fillStyle: wallBackColor,
				},
			},
		);
		this.top = this.top - 50;
		this.body = [
			topRightEdge,
			topLeftEdge,
			leftWallBack,
			rightWallBack,
			topWallBack,
			bottomLeftEdge,
			bottomRightEdge,
			bottomWallBack,
			rightWall,
			bottomWall,
			leftWall,
			topWall,
		];
	}
}
