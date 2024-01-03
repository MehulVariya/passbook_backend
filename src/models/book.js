const conn = require("../database/connection");
const { executeQuery } = require("../utils/utils");

class Book {
    static getAll() {
        const query = "select * from tbl_book";
        return executeQuery(conn, query, []);
    }

    static async addBook(book) {
        console.log(book);
        const {  user_id, type,amount, book_desc } = book;
        if (user_id && type && amount && book_desc) {
            const today = new Date();
            console.log("Created date : " + today);
            const query = "insert into tbl_book ( user_id, type, amount, book_desc, create_dt) values(?,?,?,?,?)";
            const fields = [user_id, type,amount, book_desc,today];
            console.log(fields);
            return executeQuery(conn, query, fields);
        } else {
            throw "fields are empty not allows";
        }
    }

    static removeBookById(doctorId) {
         const query = "delete from tbl_book where book_id = ?";
         return executeQuery(conn, query, doctorId);
    }

    static getBookByKey(key,value){
        const query = `select * from tbl_book where ${key} = ?`;
        return executeQuery(conn, query, [value]);
    }

    static updateBook(book) {
        const query = "update tbl_book set ? where book_id = ?";
        return executeQuery(conn, query, [book, book.book_id]);
    }
}

module.exports = Book

