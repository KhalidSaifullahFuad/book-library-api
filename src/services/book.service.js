// Dependencies
const uuid = require('uuid');
const Book = require('../models/book.model.json');

// Service methods
class BookService {

    static getAllBooks() {
        return Promise.resolve(Book);
    }

    static getBookById(id) {
        return new Promise((resolve, reject) => {
            const index = Book.findIndex(book => book.id === id);

            if (index === -1) {
                return reject("Book not found");
            }
            resolve(Book[index]);
        });
    }

    static addBook(book) {
        return new Promise((resolve, reject) => {
            const id = uuid.v4();
            const newBook = { id, ...book };

            Book.push(newBook);
            resolve(newBook);
        });
    }

    static updateBook(id, book) {
        return new Promise((resolve, reject) => {
            const index = Book.findIndex(book => book.id === id);

            if (index === -1) {
                return reject("Book not found");
            }
            Book[index] = book;
            resolve(Book[index]);
        });
    }

    static deleteBook(id) {
        return new Promise((resolve, reject) => {
            const index = Book.findIndex(book => book.id === id);

            if (index === -1) {
                return reject("Book not found");
            }
            Book.splice(index, 1);
            resolve("Book deleted");
        });
    }
}

module.exports = BookService;