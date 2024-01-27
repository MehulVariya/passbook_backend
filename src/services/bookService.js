const Book = require("../models/book");

class BookService {
    static getBooksList(user_id) {
        return Book.getAll(user_id);
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
    static getBooksByDate(from_date, to_date,user_id) {
        return Book.getBooksByDate(from_date, to_date,user_id);
    }
    static getBooksByRecordType(user_id,receiver_id) {
        return Book.getBooksByRecordType(user_id,receiver_id);
    }
    static updateBook(book) {
        return Book.updateBook(book);
    }

}

module.exports = BookService