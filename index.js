// Dependencies
const express = require("express");
const app = express();

// Router Middleware
const userRouter = require("./src/routers/user.router");
const bookRouter = require("./src/routers/book.router");

// Environment Variables
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);

app.get("/", (req, res) => {
	res.status(200).json({
		api: "Book Library API",
		version: "1.0.0",
		author: "Khalid Saifullah Fuad",
	});
});

app.get("/help", (req, res) => {
	res.status(200).json({
		"GET /api/user": "Get All Users",
		"GET /api/user/:id": "Get User By ID",
		"POST /api/user/register": "Register User",
		"POST /api/user/login": "Login User",
		"GET /api/user/logout": "Logout User",
		"GET /api/user/check": "Check User Login Status",
		"GET /api/book": "Get All Books",
		"GET /api/book/:id": "Get Book By ID",
		"POST /api/book": "Add Book",
		"PUT /api/book/:id": "Update Book",
		"DELETE /api/book/:id": "Delete Book",
	});
});

app.use((err, req, res, next) => {
	if (err instanceof SyntaxError) {
		res.status(400).json({ error: "Invalid JSON in request body" });
	}
	else {
		res.status(500).json({ error: "Internal server error" });
	}
});

app.use((req, res) => {
	res.status(404).json({error: "Invalid API Endpoint or Request Method"});
});

app.listen(PORT, (err) => {
	if (err) console.error(err);
	console.log(`\x1b[33m> Server is running on port ${PORT}...\x1b[0m`);
});
