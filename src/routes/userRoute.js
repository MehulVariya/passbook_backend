const express = require("express");
const route = new express.Router();
const UserController = require("../controllers/userController");

route.get("/users", (req, res) => { UserController.getUsersList(req, res); });
route.post("/users", (req, res) => { UserController.addUser(req, res) });
route.delete("/users/:user_id", (req, res) => { UserController.removeUserById(req, res); });
route.post("/user", (req, res) => { UserController.getUserById(req, res); });
route.post("/users/login", (req, res) => { UserController.login(req, res); });
route.patch("/users", (req, res) => { UserController.updateUser(req, res); });

module.exports = route;