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
    static getBooksByDate(from_date, to_date) {
        return Book.getBooksByDate(from_date, to_date);
    }
    static updateBook(book) {
        return Book.updateBook(book);
    }

}

module.exports = BookService