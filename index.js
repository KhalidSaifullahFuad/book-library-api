// Dependencies
const express = require("express");
const app = express();

// Router Middleware
const userRouter = require("./src/routers/user.router");
const bookRouter = require("./src/routers/book.router");

// Environment Variables
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.get("/", (req, res) => {
	res.status(200).json({
		api: "Book Library API",
		version: "1.0.0",
		author: "Khalid Saifullah Fuad",
	});
});


app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);

app.listen(PORT, (err) => {
	if (err) console.error(err);
	console.log(`\x1b[33m> Server is running on port ${PORT}...\x1b[0m`);
});
