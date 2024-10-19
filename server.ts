import { file } from "bun";

console.log("Starting server...");
Bun.serve({
	port: 8000,
	fetch(req) {
		const url = new URL(req.url);
		if (url.pathname === "/") return new Response(file("./index.html"));
		return new Response("404!");
	},
});
