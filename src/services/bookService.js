const Book = require("../models/book");

class BookService {
    static getBooksList() {
        return Book.getAll();
    }

    static addBook(book) {
        return Book.addBook(book);
    }

    static removeBookById(bookId) {
        return Book.removeBookById(bookId);
    }
    static getBookByKey(key,value) {
        return Book.getBookByKey(key,value);
    }
    static updateBook(book) {
        return Book.updateBook(book);
    }

}

module.exports = BookService