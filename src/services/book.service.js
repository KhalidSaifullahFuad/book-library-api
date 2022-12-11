// Dependencies
const {MongoClient, ObjectId} = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URI;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = client.db('book_library_db');
const collection = db.collection('books');

// Service methods
class BookService {
    static async getAllBooks() {
        const books = [];
        await collection.find().forEach(book => books.push(book));

        if(books.length === 0)
            throw new Error("No books found");

        return books;
    }

    static async getBookById(id) {
        const book = await collection.findOne({ _id: ObjectId(id) });

        if(result === null)
            throw new Error("Book not found");

        return book;
    }

    static async addBook(book) {
        const result = await collection.insertOne(book);

        if(result.insertedCount === 0)
            throw new Error("Book not added");

        return book;
    }

    static async updateBook(id, book) {
        const result = await collection.findOne({ _id: ObjectId(id) });

        if(result === null)
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

    static async deleteBook(id){

        const result = await collection.findOne({ _id: ObjectId(id) });

        if(result === null)
            throw new Error("Book not found");

        const deletedBook = await collection.findOneAndDelete({ _id: ObjectId(id) });

        if(deletedBook.value === null)
            throw new Error("Book not deleted");

        return deletedBook.value;
    }
}


module.exports = BookService;