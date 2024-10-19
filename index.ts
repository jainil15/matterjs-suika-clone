import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "./src/constant";
import { Game } from "./src/game";

function animate(game: Game): void {
	game.draw();
}

window.onload = () => {
	const game = new Game();
	animate(game);
};
