const conn = require("../database/connection");
const { executeQuery } = require("../utils/utils");

class Book {
    static getAll(user_id) {
        const query = `select * from tbl_book where user_id = ${user_id} or receiver_id = ${user_id} or record_type = "Company" `;
        return executeQuery(conn, query, []);
    }

    static async addBook(book) {
        console.log(book);
        const { user_id, receiver_id, user_name, record_type, type, amount, book_desc } = book;
        if (user_id && type && amount && book_desc && record_type) {
            const today = new Date();
            console.log("Created date : " + today);
            const query = "insert into tbl_book ( user_id,receiver_id,user_name, type,record_type, amount, book_desc, create_dt) values(?,?,?,?,?,?,?,?)";
            const fields = [user_id, receiver_id, user_name, type, record_type, amount, book_desc, today];
            console.log(fields);
            const result = await executeQuery(conn, query, fields);
            const bookId = JSON.parse(JSON.stringify(result)).insertId;
            return this.getBookByKey("book_id", bookId)
        } else {
            throw "fields are empty not allows";
        }
    }

    static removeBookById(bookId) {
        const query = "delete from tbl_book where book_id = ?";
        return executeQuery(conn, query, bookId);
    }

    static getBookByKey(key, value) {
        const query = `select * from tbl_book where ${key} = ?`;
        return executeQuery(conn, query, [value]);
    }

    static getBooksByDate(from_date, to_date, user_id) {
        const query = `select * from tbl_book where create_dt BETWEEN ? AND ? AND ( user_id = ${user_id} or receiver_id = ${user_id} or record_type = "Company" )`;
        return executeQuery(conn, query, [from_date, to_date]);
    }

    static getBooksByRecordType(user_id,receiver_id) {
        const query = `select * from tbl_book where (user_id = ${user_id} AND receiver_id =${receiver_id}) OR  (user_id = ${receiver_id} AND receiver_id =${user_id})`;
        return executeQuery(conn, query, []);
    }

    static updateBook(book) {
        const query = "update tbl_book set ? where book_id = ?";
        return executeQuery(conn, query, [book, book.book_id]);
    }
}

module.exports = Book

