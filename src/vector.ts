export class Vector {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	mulConstanct(n: number) {
		this.x = this.x * n;
		this.y = this.y * n;
	}
	add(v: Vector) {
		this.x = this.x + v.x;
		this.y = this.y + v.y;
	}
	static zero(): Vector {
		return new Vector(0, 0);
	}
	distance(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	normalized(): Vector {
		let distance = this.distance();
		return new Vector(this.x / distance, this.y / distance);
	}
	sub(v: Vector) {
		this.x = this.x - v.x;
		this.y = this.y - v.y;
	}
	mul(v: Vector) {
		this.x *= v.x;
		this.y *= v.y;
	}
	clone(): Vector {
		return new Vector(this.x, this.y);
	}
}
