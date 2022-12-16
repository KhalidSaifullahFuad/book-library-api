// Dependencies
const {db, ObjectId} = require('../services/db.service');

// MongoDB Collection
const collection = db.collection('books');

// Service methods
async function getAllBooks() {
    const books = [];
    await collection.find().forEach(book => books.push(book));

    if(books.length === 0)
        throw new Error("No books found");

    return books;
}

async function getBookById(id) {
    const book = await collection.findOne({ _id: ObjectId(id) });

    if(book === null)
        throw new Error("Book not found");

    return book;
}

async function addBook(book) {
    const result = await collection.insertOne(book);

    if(result.insertedCount === 0)
        throw new Error("Book not added");

    return book;
}

async function updateBook(id, book) {
    const existingBook = await collection.findOne({ _id: ObjectId(id) });

    if(existingBook === null)
        throw new Error("Book not found");

    const updatedBook = await collection.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: book },
        { returnOriginal: false }
    );

    if(updatedBook.value === null)
        throw new Error("Book not updated");

    return updatedBook.value;
}

async function deleteBook(id){

    const book = await collection.findOne({ _id: ObjectId(id) });

    if(book === null)
        throw new Error("Book not found");

    const deletedBook = await collection.findOneAndDelete({ _id: ObjectId(id) });

    if(deletedBook.value === null)
        throw new Error("Book not deleted");

    return deletedBook.value;
}

module.exports = {getAllBooks, getBookById, addBook, updateBook, deleteBook};