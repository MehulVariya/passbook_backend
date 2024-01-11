const UserService = require("../services/userService");
const { sendResponse, sendResponseAsError, sendResponseMassage } = require("../utils/utils");

class UserController {
    static async getUsersList(req, res) {
        try {
            const users = await UserService.getUsersList();
            sendResponse(res, users);
            console.log(users);
        } catch (err) {
            console.log(err);
            sendResponseAsError(res, err);
        }
    }


    static async login(req, res) {
        try {
            const { email_id, password } = req.body;
            console.log(email_id, password);
            console.log(req.body);
            if (email_id != null && password != null) {
                const userRowPacket = await UserService.getUserByKey(`email_id`, email_id);
                const user = JSON.parse(JSON.stringify(userRowPacket))[0];
                console.log(user);
                if (user) {
                    console.log(user);
                    const ischeck = password == user.password
                    if (ischeck) {
                        sendResponse(res, { user_id: user.user_id, user_name: user.user_name, email_id: email_id });
                    }
                    else {
                        sendResponseAsError(res, "Invalid Password!")
                    }
                } else {
                    sendResponseAsError(res, "User are not exist");
                }
            } else {
                sendResponseAsError(res, "All filed are required");
            }
        } catch (err) {
            sendResponseAsError(res, err);
        }
    }


    static async addUser(req, res) {
        try {
            const user = req.body
            const resultUser = await UserService.addUser(user);
            const userID = JSON.parse(JSON.stringify(resultUser)).insertId;
            console.log("user_id : "+userID);
            const resultUserJson = {user_id:userID,user_name:user.name,email_id:user.email_id,password:user.password}
            sendResponse(res, resultUserJson);
        } catch (err) {
            sendResponseAsError(res, err);
        }
    }

    static async removeUserById(req, res) {
        try {
            const response = await UserService.removeUserById(req.params.user_id);
            sendResponseMassage(res, "Data Removed", response);
        } catch (err) {
            sendResponseAsError(res, err);
        }
    }

    static async getUserById(req, res) {
        try {
            const userID = req.body.user_id
            const userName = req.body.user_name
            if (userID) {
                const user = await UserService.getUserByKey("user_id", userID);
                sendResponse(res, user);
            } else {
                const user = await UserService.getUserByKey("user_name", userName);
                sendResponse(res, user);
            }

        } catch (err) {
            sendResponseAsError(res, err);
        }
    }
    static async updateUser(req, res) {
        try {
            const response = await UserService.updateUser(req.body);
            sendResponseMassage(res, "Data Updated", response);
        } catch (err) {
            sendResponseAsError(res, err);
        }
    }
}

module.exports = UserController