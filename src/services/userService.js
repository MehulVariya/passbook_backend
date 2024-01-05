const User = require("../models/user");

class UserService {
    static getUsersList() {
        return User.getAll();
    }

    static addUser(user) {
        return User.addUser(user);
    }

    static removeUserById(userId) {
        return User.removeUserById(userId);
    }
    static getUserByKey(key,value) {
        return User.getUserByKey(key,value);
    }
    static updateUser(user) {
        return User.updateUser(user);
    }

}

module.exports = UserService