// Dependencies
const express = require("express");
const router = express.Router();

// Middleware
router.use(express.json());

// Services
const bookService = require("../services/book.service");

// Routes
//--> GET - /api/book
router.get("/", async (req, res) => {
	try{
		const books = await bookService.getAllBooks();
		res.status(200).json(books);
	}catch(err){
		res.status(400).json(err);
	}
});

//--> GET - /api/book/:id
router.get("/:id", async (req, res) => {
	try{
		const book = await bookService.getBookById(req.params.id);
		res.status(200).json(book);
	}
	catch(err){
		res.status(404).json(err)
	};
});

//--> POST - /api/book
router.post("/", async (req, res) => {
	try{
		const book = await bookService.addBook(req.body);
		res.status(201).json(book);
	}catch(err){
		res.status(400).json(err);
	}
});

//--> PUT - /api/book/:id
router.put("/:id", async (req, res) => {
	try{
		const book = await bookService.updateBook(req.params.id, req.body);
		res.status(200).json(book)
	}
	catch(err){
		res.status(404).json(err)
	}
});

//--> DELETE - /api/book/:id
router.delete("/:id", async (req, res) => {
	try {
		const book = await bookService.deleteBook(req.params.id);
		res.status(200).json(book);
	}
	catch(err){
		res.status(404).json(err)
	}
});

module.exports = router;