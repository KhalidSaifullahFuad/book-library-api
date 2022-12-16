// Service
const bookService = require("../services/book.service");

// Schema
const {bookSchema, options} = require("../models/validation/book.schema");

async function get(req, res, next) {
	try{
		const books = await bookService.getAllBooks();
		res.status(200).json(books);
	}catch(err){
		res.status(400).json({error: err.message});
	}
}

async function getById(req, res) {
    try{
        const book = await bookService.getBookById(req.params.id);
        res.status(200).json(book);
    }
    catch(err){
        res.status(404).json({error: err.message})
    };
}

async function add(req, res) {
    try{
        const result = bookSchema.validate(req.body, options);
        if(result.error)
            throw new Error(result.error.details[0].message);

        const book = await bookService.addBook(req.body);

        res.status(201).json(book);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}


async function update(req, res) {
    try{
        const result = bookSchema.validate(req.body, options);
        if(result.error)
            throw new Error(result.error.details[0].message);

        const book = await bookService.updateBook(req.params.id, req.body);
        res.status(200).json(book);
    }
    catch(err){
        res.status(404).json({error: err.message});
    }
}

async function remove(req, res) {
    try {
        const book = await bookService.deleteBook(req.params.id);
        res.status(200).json(book);
    }
    catch(err){
        res.status(404).json({error: err.message})
    }
}

module.exports = {get, getById, add, update, remove};