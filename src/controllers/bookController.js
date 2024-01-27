const BookService = require("../services/bookService");
const UserService = require("../services/userService");
const { sendResponse, sendResponseAsError, sendResponseMassage } = require("../utils/utils");

class BookController {
    static async getBooksList(req, res) {
        try {
            const user_id = req.query.user_id;
            console.log(user_id);
            const books = await BookService.getBooksList(user_id);
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
            const userRowPacket = await UserService.getUserByKey(`user_id`, book.user_id);
            const user = JSON.parse(JSON.stringify(userRowPacket))[0];
            console.log(user);
            const name = user.user_name;
            console.log("11111>>>>" + name);
            book.user_name = name;
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
            const book_id = req.body.book_id
            if (book_id) {
                const book = await BookService.getBookByKey("book_id", book_id);
                sendResponse(res, book);
            } else {
                const user_id = req.body.user_id
                const book = await BookService.getBooksByUserID(user_id);
                sendResponse(res, book);
            }
        } catch (err) {
            sendResponseAsError(res, err);
        }
    }

    static async getBookByDate(req, res) {
        try {
            const from_date = req.body.from_date;
            const to_date = req.body.to_date;
            const user_id = req.body.user_id;
            const books = await BookService.getBooksByDate(from_date, to_date,user_id);
            sendResponse(res, books);
            console.log(books);
        } catch (err) {
            console.log(err);
            sendResponseAsError(res, err);
        }
    }

    static async getBookByRecordType(req, res) {
        try {
            const user_id = req.body.user_id;
            const receiver_id = req.body.receiver_id;
            const books = await BookService.getBooksByRecordType(user_id,receiver_id);
            sendResponse(res, books);
            console.log(books);
        } catch (err) {
            console.log(err);
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