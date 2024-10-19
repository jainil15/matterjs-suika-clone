export class InputHandler {
	constructor() {}
	addPointerMoveHandler(handler: (e: PointerEvent) => any): void {
		window.addEventListener("pointermove", handler);
	}
	addPointerClickHandler(handler: (e: PointerEvent) => any): void {
		window.addEventListener("pointerdown", handler);
	}
}
