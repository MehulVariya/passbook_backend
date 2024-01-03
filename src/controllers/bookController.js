const BookService = require("../services/bookService");
const { sendResponse, sendResponseAsError, sendResponseMassage } = require("../utils/utils");

class BookController {
    static async getBooksList(req, res) {
        try {
            const books = await BookService.getBooksList();
            sendResponse(res, books);
            console.log(books);
        } catch (err) {
            console.log(err);
            sendResponseAsError(res, err);
        }
    }

    static async addBook(req, res) {
        try {
            const book = req.body
            const resultBook = await BookService.addBook(book);
            sendResponse(res, resultBook);
        } catch (err) {
            sendResponseAsError(res, err);
        }
    }

    static async removeBookById(req, res) {
        try {
            const response = await BookService.removeBookById(req.params.book_id);
            sendResponseMassage(res, "Data Removed", response);
        } catch (err) {
            sendResponseAsError(res, err);
        }
    }

    static async getBookById(req, res) {
        try {
            const book = await BookService.getBookByKey("book_id", req.params.book_id);
            sendResponse(res, book);
        } catch (err) {
            sendResponseAsError(res, err);
        }
    }
    static async updateBook(req, res) {
        try {
            const response = await BookService.updateBook(req.body);
            sendResponseMassage(res, "Data Updated", response);
        } catch (err) {
            sendResponseAsError(res, err);
        }
    }
}

module.exports = BookController