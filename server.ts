import { file } from "bun";

console.log("Starting server...");
Bun.serve({
	port: 8000,
	async fetch(req) {
		const res = new Response("hello world");
		res.headers.set("Access-Control-Allow-Origin", "*");
		res.headers.set(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS",
		);

		// add Access-Control-Allow-Headers if needed
		const url = new URL(req.url);
		if (url.pathname === "/") return new Response(file("./index.html"));
		if (url.pathname === "/write") {
			if (req.body !== null) {
				const body = await req.json();
				const json = JSON.stringify(body);
				Bun.write("output.txt", json);
			}
		}
		return res;
	},
});
