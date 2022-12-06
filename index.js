// Dependencies
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.status(200).json({
		api: "Book Library API",
		version: "1.0.0",
		author: "Khalid Saifullah Fuad",
	});
});

app.listen(PORT, (err) => {
	if (err) console.error(err);
	console.log(`\x1b[33m> Server is running on port ${PORT}...\x1b[0m`);
});
