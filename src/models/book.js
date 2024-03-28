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
        const query = `delete from tbl_book where book_id = ${bookId}`;
        return executeQuery(conn, query, []);
    }

    static getBookByKey(key, value) {
        const query = `select * from tbl_book where ${key} = ?`;
        return executeQuery(conn, query, [value]);
    }

    static getBooksByUserID(user_id) {
        const query = `select * from tbl_book where record_type = "Company" AND user_id = ${user_id}`;
        return executeQuery(conn, query, []);
    }

    static getBooksByDate(from_date, to_date, user_id) {
        const query = `select * from tbl_book where (create_dt >= '${from_date}' AND create_dt <= '${to_date}') AND ( user_id = ${user_id} or receiver_id = ${user_id} or record_type = "Company" )`;
        console.log(query);
        return executeQuery(conn, query, []);
    }

    static getBooksByRecordType(user_id, receiver_id) {
        const query = `select * from tbl_book where (user_id = ${user_id} AND receiver_id =${receiver_id}) OR  (user_id = ${receiver_id} AND receiver_id =${user_id})`;
        return executeQuery(conn, query, []);
    }

    static updateBook(book) {
        const type = book.type;
        const amount = book.amount;
        const book_desc = book.book_desc
        const id = book.book_id;
        if (type && amount && book_desc && id) {
            const query = `UPDATE tbl_book SET type='${type}',amount=${amount},book_desc='${book_desc}' WHERE book_id = ${id}`;
            console.log(query);
            return executeQuery(conn, query, []);
        } else {
            throw "Complate required field"
        }

    }
}

module.exports = Book

