const conn = require("../database/connection");
const { executeQuery } = require("../utils/utils");

class User {
    static getAll() {
        const query = "select * from tbl_user";
        return executeQuery(conn, query, []);
    }

    static async addUser(user) {
        console.log(user);
        const { user_name, email_id, password } = user;
        if (user_name && email_id && password) {

            const query = "insert into tbl_user ( user_name, email_id,password) values(?,?,?)";
            const fields = [user_name, email_id, password];
            console.log(fields);
            return executeQuery(conn, query, fields);
        } else {
            throw "fields are empty not allows";
        }
    }

    static removeUserById(userId) {
        const query = "delete from tbl_user where user_id = ?";
        return executeQuery(conn, query, userId);
    }

    static getUserByKey(key, value) {
        const query = `select * from tbl_user where ${key} = ?`;
        return executeQuery(conn, query, [value]);
    }

    static updateUser(user) {
        const query = "update tbl_user set ? where user_id = ?";
        return executeQuery(conn, query, [user, user.user_id]);
    }
}

module.exports = User

