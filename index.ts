import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "./src/constant";
import { Game } from "./src/game";

function animate(ctx: CanvasRenderingContext2D, game: Game): void {
	ctx.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
	game.update();
	game.draw(ctx);

	requestAnimationFrame(() => {
		animate(ctx, game);
	});
}

window.onload = () => {
	const canvas = document.getElementById("game") as HTMLCanvasElement;
	canvas.width = DISPLAY_WIDTH;
	canvas.height = DISPLAY_HEIGHT;
	const ctx = canvas.getContext("2d");
	if (ctx != null) {
		const game = new Game(canvas);
		animate(ctx, game);
	}
};
