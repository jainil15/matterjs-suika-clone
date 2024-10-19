export class InputHandler {
	canvas: HTMLCanvasElement;
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
	}
	addPointerMoveHandler(handler: (e: PointerEvent) => any): void {
		this.canvas.addEventListener("pointermove", handler);
	}
	addPointerClickHandler(handler: (e: PointerEvent) => any): void {
		this.canvas.addEventListener("pointerdown", handler);
	}
}
